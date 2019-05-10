class Document < ApplicationRecord
  enum issued_for: [ :information, :review ], _prefix: true

  belongs_to :user

  belongs_to :project

  belongs_to :revision, class_name: 'DocumentRevision', foreign_key: 'document_revision_id'

  has_one :document_main, through: :revision

  has_many :document_fields, as: :parent, index_errors: true

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

  validate :prevent_update_of_codification_string,
           on: :create

  validate :prevent_update_of_values,
           on: :update

  scope :first_version, -> { order(revision_version: :asc).first }

  scope :last_version, -> { order(revision_version: :asc).last }

  def self.build_from_convention(convention, user)
    doc = self.new.attributes.except('id', 'created_at', 'updated_at')
    doc['document_fields_attributes'] = []
    convention.document_fields.each do |field|
      field_attributes = field.build_for_new_document(user)
      if field_attributes.present?
        doc['document_fields_attributes'] << field_attributes
      end
    end
    doc
  end

  def can_create?(user)
    # user cannot create document if he has no access to at least one value
    # for each field that can be limited by value
    !project.conventions.active.document_fields.limit_by_value.map do |field|
      field.document_rights.where(user: user,
                                  limit_for: :value,
                                  enabled: true,
                                  view_only: false).any?
    end.include?(false)
  end

  def can_view?(user)
    # user cannot view document if he has no access to all values
    # for each field that can be limited by value
    !project.conventions.active.document_fields.limit_by_value.map do |field|
      !field.document_field_values.map do |value|
        field.document_rights.where(user: user,
                                    limit_for: :value,
                                    enabled: true,
                                    document_field_value: value).any?
      end.include?(false)
    end.include?(false)
  end

  def attributes_for_edit
    doc = attributes.except('id', 'created_at', 'updated_at', 'revision_version')
    doc['document_fields_attributes'] = []
    document_fields.each do |field|
      field_attributes = field.build_for_edit_document
      if field_attributes.present?
        doc['document_fields_attributes'] << field_attributes
      end
    end
    doc
  end

  def attributes_for_show
    doc = attributes_for_edit
    doc['project_name'] = project.name
    doc['document_id'] = codification_string
    doc['username'] = user.attributes.slice('first_name', 'last_name')
    doc['created_at'] = created_at
    doc
  end

  def codification_string
    str = ''
    # there should be project code
    str << document_fields.detect{ |i| i['codification_kind'] == 'originating_company' }
            .document_field_values.detect{ |i| i['selected'] == true }.value
    str << '-'
    str << document_fields.detect{ |i| i['codification_kind'] == 'discipline' }
            .document_field_values.detect{ |i| i['selected'] == true }.value
    str << '-'
    str << document_fields.detect{ |i| i['codification_kind'] == 'document_type' }
            .document_field_values.detect{ |i| i['selected'] == true }.value
    str << '-'
    str << document_fields.detect{ |i| i['codification_kind'] == 'document_number' }.value
    str
  end

  private

  def original_document
    document_main.revisions.order_by_revision_number.first.versions.first_version
  end

  def prevent_update_of_codification_string
    if original_document.present? && original_document.codification_string != codification_string
      errors.add(:document_fields, :codification_string_changed)
    end
  end

  def prevent_update_of_values
    error =
      document_fields.map do |field|
        field.document_field_values.map do |value|
          # bug https://github.com/rails/rails/issues/31937
          value.changed? && !(value.changes.keys - ['created_at', 'updated_at']).empty?
        end.include?(true)
      end.include?(true)
    errors.add(:document_fields, :codification_field_changed) if error
  end
end
