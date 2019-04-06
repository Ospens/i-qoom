class Document < ApplicationRecord
  enum issued_for: [ :information, :review ], _prefix: true

  belongs_to :user

  has_many :document_fields, as: :parent

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

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
end
