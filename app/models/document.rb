class Document < ApplicationRecord
  enum issued_for: [ :information, :review ], _prefix: true

  belongs_to :user

  belongs_to :project

  has_many :document_fields, as: :parent

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

  scope :order_by_revision_number, -> { order(revision_number: :asc) }

  def self.build_from_convention(convention, user)
    doc = Document.new.attributes.except('id', 'created_at', 'updated_at')
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
      field.document_rights.where(user: user, limit_for: :value).any?
    end.include?(false)
  end

  def attributes_for_edit
    doc = attributes
    doc['document_fields_attributes'] = []
    document_fields.each do |field|
      field_attributes = field.build_for_edit_document
      if field_attributes.present?
        doc['document_fields_attributes'] << field_attributes
      end
    end
    doc
  end

  def codification_kinds
    DocumentField.codification_kinds
  end

  def originating_company
    document_fields.find { |i| i['codification_kind'] == 'originating_company' }
      .document_field_values.find { |i| i['selected'] == true }.value
  end

  def discipline
    document_fields.find { |i| i['codification_kind'] == 'discipline' }
      .document_field_values.find { |i| i['selected'] == true }.value
  end

  def document_type
    document_fields.find { |i| i['codification_kind'] == 'document_type' }
      .document_field_values.find { |i| i['selected'] == true }.value
  end

  def document_number
    document_fields.find { |i| i['codification_kind'] == 'document_number' }.value
  end

  def revisions
    documents = project.documents.joins(document_fields: :document_field_values)
    # originating_company
    query_hash = {
      codification_kind: codification_kinds[:originating_company],
      document_field_values: { value: originating_company }
    }
    documents = documents.where(document_fields: query_hash).pluck(:id)
    documents = Document.where(id: documents)
    # discipline
    documents = documents.joins(document_fields: :document_field_values)
    query_hash = {
      codification_kind: codification_kinds[:discipline],
      document_field_values: { value: discipline }
    }
    documents = documents.where(document_fields: query_hash).pluck(:id)
    documents = Document.where(id: documents)
    # document_type
    documents = documents.joins(document_fields: :document_field_values)
    query_hash = {
      codification_kind: codification_kinds[:document_type],
      document_field_values: { value: document_type }
    }
    documents = documents.where(document_fields: query_hash)
    documents = Document.where(id: documents)
    # document_number
    documents = documents.joins(:document_fields)
    query_hash = {
      codification_kind: codification_kinds[:document_number],
      value: document_number
    }
    documents = documents.where(document_fields: query_hash)
    documents
  end
end
