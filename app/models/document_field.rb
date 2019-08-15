class DocumentField < ApplicationRecord
  enum kind: [ :text_field,
               :select_field,
               :textarea_field,
               :upload_field,
               :date_field,
               :project_phase_field,
               :hidden_field ]

  enum codification_kind: [ :originating_company,
                            :receiving_company,
                            :discipline,
                            :document_type,
                            :document_number,
                            :revision_number,
                            :revision_date,
                            :revision_version,
                            :document_native_file,
                            :additional_information ]

  attr_accessor :filename

  belongs_to :parent, polymorphic: true

  has_many :document_rights,
           dependent: :destroy

  has_many :document_field_values,
           dependent: :destroy

  accepts_nested_attributes_for :document_field_values

  has_one_attached :file,
                   dependent: :purge

  before_validation :set_required,
                    if: -> { codification_kind.present? }

  before_validation :set_revision_version,
                    if: -> { parent.class.name == 'Document' && revision_version? },
                    on: :create

  before_validation :attach_previous_file,
                    if: -> { parent.class.name == 'Document' &&
                             upload_field? &&
                             !file.attached? },
                    on: :create

  after_save :update_revision_number,
             if: -> { parent.class.name == 'Document' && revision_number? }

  after_create :update_revision_version,
               if: -> { parent.class.name == 'Document' && revision_version? }

  validate :revision_number_valid,
           if: -> { parent.class.name == 'Document' && revision_number? },
           on: :create

  validate :field_is_required,
           if: -> { parent.class.name == 'Document' && (required? || upload_field?) }

  validate :multiselect_is_not_allowed,
           if: -> { parent.class.name == 'Document' &&
                    should_have_document_field_values? &&
                    !multiselect? }

  with_options unless: -> { parent.class.name == 'DocumentFolder' } do
    validates :kind,
              presence: true

    validates :column,
              inclusion: { in: [1, 2] }

    validate :has_field_values,
             if: :should_have_document_field_values?

    validate :must_be_select_field,
             if: :codification_kind_as_select_field?

    validate :must_be_text_field,
             if: :codification_kind_as_text_field?

    validate :must_be_date_field,
             if: :revision_date?

    validate :must_be_upload_field,
             if: :document_native_file?

    validate :must_be_textarea_field,
             if: :additional_information?
  end

  scope :limit_by_value, -> {
    where(codification_kind: [:originating_company, :discipline, :document_type])
  }

  scope :order_by_columns_and_rows, -> {
    first_column = where(column: 1).order(row: :asc)
    second_column = where(column: 2).order(row: :asc)
    result = []
    ((first_column.count + second_column.count) / 2).times do |i|
      result << first_column[i] if first_column[i].present?
      result << second_column[i] if second_column[i].present?
    end
    result
  }

  def build_for_new_document(user)
    return if !can_build?(user)
    original_attributes =
      attributes.except('id', 'parent_id', 'parent_type', 'created_at', 'updated_at')
    if select_field?
      original_attributes['document_field_values'] = []
      document_field_values.each do |field_value|
        if can_limit_by_value?
          next if !has_access_for_limit_by_value_value?(user, field_value)
        end
        original_attributes['document_field_values'] << field_value.build_for_new_document
      end
    end
    if document_native_file? && parent.class.name == 'Convention'
      original_attributes['required'] = true
    end
    original_attributes
  end

  def build_for_edit_document
    return if revision_version?
    original_attributes =
      attributes.except('id', 'parent_id', 'parent_type', 'created_at', 'updated_at')
    if upload_field? && file.attached?
      original_attributes['filename'] = file.filename.to_s
    end
    if codification_kind.present?
      original_attributes['document_field_values'] = []
      document_field_values.each do |field_value|
        field_value_attrs = field_value.build_for_new_document
        original_attributes['document_field_values'] << field_value_attrs
      end
    end
    original_attributes
  end

  def can_build?(user)
    return false if parent.class.name != 'Convention' || revision_version?
    return true if user == parent.project.user
    can_build_codification_field?(user) ||
      # limitation by field is temporarily disabled
      # Hello Yasser,
      # We should remove Limit access link from convention form and create
      # separate page like Access rights page but for fields access rights.
      # This is because when we create new convention there is no fields yet,
      # so we can't grand access to non-existent fields. When we updating
      # convention we just creating new version of previous convention, so
      # fields are not exist too.
      # PS But I don't know how this page UI should look.
      # Thanks
      # Hi Artem,
      # please skip this function for now. We will review an alternative when
      # DMS is deployed.
      # Thanks
      (!codification_kind.present? && true
      #  document_rights.where(user: user,
      #                        limit_for: DocumentRight.limit_fors[:field],
      #                        enabled: true).any?
      )
  end

  def should_have_document_field_values?
    select_field? || project_phase_field?
  end

  def can_limit_by_value?
    originating_company? || discipline? || document_type?
  end

  def codification_kind_as_select_field?
    originating_company? || receiving_company? || discipline? || document_type?
  end

  def codification_kind_as_text_field?
    document_number? || revision_number?
  end

  def has_access_for_limit_by_value_value?(user, value)
    return true if user == parent.project.user
    document_rights.find_by(user: user,
                            document_field_value: value,
                            enabled: true,
                            view_only: false).present?
  end

  private

  def has_field_values
    if document_field_values.length == 0
      errors.add(:document_field_values, :empty)
    end
  end

  def set_required
    self.required = document_native_file? ? false : true
  end

  def can_build_codification_field?(user)
    rights = document_rights
    limit_for = DocumentRight.limit_fors
    if can_limit_by_value?
      rights.where(user: user, limit_for: limit_for[:value]).any?
    elsif codification_kind.present?
      !rights.any? || rights.where(user: user, limit_for: limit_for[:field]).any?
      true # limitation by field is temporarily disabled
    else
      false
    end
  end

  def revision_number_valid
    prev_revision =
      parent.revision.document_main.revisions.where.not(id: parent.revision.id).last_revision
    if prev_revision.present? && value.to_i <= prev_revision.revision_number.to_i
      errors.add(:value, :revision_number_must_be_greater_than_last_revision_number)
    elsif value.to_i == 0 && value != '0' && value != '00'
      errors.add(:value, :revision_number_must_be_zero_or_greater)
    elsif value.to_i >= 100
      errors.add(:value, :revision_number_must_be_less_than_100)
    end
  end

  def update_revision_number
    parent.revision.update(revision_number: value)
  end

  def update_revision_version
    parent.update(revision_version: value)
  end

  def set_revision_version
    document = parent.revision.versions.last_version
    return if parent == document
    self.value = document.present? ? document.revision_version.to_i + 1 : 0
  end

  def field_is_required
    if codification_kind.present?
      if (originating_company? || receiving_company? || discipline? || document_type?)
        if !document_field_values.select{ |i| i['selected'] == true }.any?
          errors.add(:document_field_values, :is_required)
        end
      elsif document_native_file?
        errors.add(:file, :is_required) if !file.attached?
      elsif additional_information?
        # nothing, not required
      elsif value.blank?
        errors.add(:value, :codification_kind_value_is_required)
      end
    elsif (text_field? || textarea_field? || date_field?)
      errors.add(:value, :text_value_is_required) if value.blank?
    elsif (select_field? || project_phase_field?)
      if !document_field_values.select{ |i| i['selected'] == true }.any?
        errors.add(:document_field_values, :is_required)
      end
    elsif upload_field?
      # file only required in initial document, afterwards empty file field
      # will be mean to copy file from previous document version
      if !file.attached? && parent.first_document_in_chain?
        errors.add(:file, :is_required)
      end
    end
  end

  def multiselect_is_not_allowed
    if document_field_values.select{ |i| i['selected'] == true }.length > 1
      errors.add(:document_field_values, :multiselect_is_not_allowed)
    end
  end

  def attach_previous_file
    rev = parent.revision
    revs = rev.document_main.revisions.where.not(id: rev)
    vers = rev.versions.where.not(id: parent)
    return unless vers.any? || revs.any?
    last_version_fields =
      if vers.any? # if new version
        vers.last_version.document_fields
      elsif revs.any? # if new revision
        revs.last_revision.last_version.document_fields
      end
    file_field =
      last_version_fields.find_by(codification_kind: codification_kind,
                                  kind: kind,
                                  title: title,
                                  row: row,
                                  column: column)
    return if file_field.blank?
    prev_file = file_field.file
    file.attach(io: StringIO.new(prev_file.download),
                filename: prev_file.filename,
                content_type: prev_file.content_type)
  end

  def must_be_select_field
    errors.add(:kind, :must_be_select_field) unless select_field?
  end

  def must_be_text_field
    errors.add(:kind, :must_be_text_field) unless text_field?
  end

  def must_be_date_field
    errors.add(:kind, :must_be_date_field) unless date_field?
  end

  def must_be_upload_field
    errors.add(:kind, :must_be_upload_field) unless upload_field?
  end

  def must_be_textarea_field
    errors.add(:kind, :must_be_textarea_field) unless textarea_field?
  end
end
