class Document < ApplicationRecord
  enum issued_for: [ :information, :review ], _prefix: true

  has_many :document_fields, as: :parent

  accepts_nested_attributes_for :document_fields

  has_one_attached :native_file

  has_many_attached :other_files

  validates_associated :document_fields

  def self.build_from_convention(convention)
    doc = Document.new
    convention.document_fields.each do |field|
      doc.document_fields.new(field.attributes.except('id', 'created_at', 'updated_at'))
    end
    doc
  end
end
