class DocumentField < ApplicationRecord
  enum kind: [ :text_field,
               :select_field,
               :textarea_field,
               :upload_field,
               :date_field,
               :project_phase_field,
               :codification_field ]

  enum codification_kind: [ :originating_company,
                            :receiving_company,
                            :discipline,
                            :document_type,
                            :document_number,
                            :revision_number,
                            :revision_date,
                            :revision_version ]

  belongs_to :parent, polymorphic: true

  has_many :document_rights

  has_many :document_field_values

  accepts_nested_attributes_for :document_field_values

  has_many_attached :files

  before_validation :set_required,
                    if: :codification_field?

  before_validation :set_revision_version,
                    if: -> { parent.class.name == 'Document' && revision_version? },
                    on: :create

  after_save :update_revision_number,
             if: -> { parent.class.name == 'Document' && revision_number? }

  after_save :update_revision_version,
             if: -> { parent.class.name == 'Document' && revision_version? }

  validates :kind,
            presence: true

  validates :codification_kind,
            presence: true,
            if: :codification_field?

  validates :column,
            inclusion: { in: [1, 2] }

  validate :has_field_values,
           if: :should_have_document_field_values?

  validate :revision_number_valid,
           if: -> { parent.class.name == 'Document' && revision_number? },
           on: :create

  scope :limit_by_value, -> {
    where(kind: :codification_field,
          codification_kind: [:originating_company, :discipline, :document_type])
  }

  def build_for_new_document(user)
    return if !can_build?(user)
    original_attributes =
      attributes.except('id', 'parent_id', 'parent_type', 'created_at', 'updated_at')
    if codification_field?
      original_attributes['document_field_values_attributes'] = []
      document_field_values.each do |field_value|
        next if document_rights.find_by(user: user, document_field_value: field_value).blank?
        original_attributes['document_field_values_attributes'] << field_value.build_for_new_document
      end
    end
    original_attributes
  end

  def build_for_edit_document
    attributes
    if codification_field?
      original_attributes['document_field_values_attributes'] = []
      document_field_values.each do |field_value|
        original_attributes['document_field_values_attributes'] << field_value.attributes
      end
    end
    attributes
  end

  def can_build?(user)
    return false if parent.class.name != 'Convention'
    can_build_codification_field?(user) ||
    (!codification_field? && document_rights.where(user: user, limit_for: DocumentRight.limit_fors[:field]).any?)
  end

  def should_have_document_field_values?
    (codification_field? && (originating_company? || receiving_company? || discipline? || document_type?)) ||
      select_field? ||
      project_phase_field?
  end

  def can_limit_by_value?
    codification_field? && (originating_company? || discipline? || document_type?)
  end

  private

  def has_field_values
    if document_field_values.length == 0
      errors.add(:document_field_values, :empty)
    end
  end

  def set_required
    self.required = true
  end

  def can_build_codification_field?(user)
    rights = document_rights
    limit_for = DocumentRight.limit_fors
    if can_limit_by_value?
      rights.where(user: user, limit_for: limit_for[:value]).any?
    else
      codification_field? &&
        (!rights.any? || rights.where(user: user, limit_for: limit_for[:field]).any?)
    end
  end

  def revision_number_valid
    document = parent.revision.document_main.revisions.last_revision
    if document.present? && value.to_i <= document.revision_number.to_i
      errors.add(:value, :revision_number_must_be_greater_last_revision_number)
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
end
