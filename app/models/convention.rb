# Conventions must be created automatically with project
class Convention < ApplicationRecord
  has_many :document_fields, as: :parent

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

  # only first and second Convention on layouts, third is not implemented
  validates :number,
            presence: true,
            inclusion: { in: [1, 2] }

  def build_default_fields
    document_fields.new(kind: :codification_field,
                        codification_kind: :originating_company,
                        title: 'Originating company',
                        command: 'Select originating company')
    if number == 2
      document_fields.new(kind: :codification_field,
                          codification_kind: :receiving_company,
                          title: 'Receiving company',
                          command: 'Select receiving company')
    end
    document_fields.new(kind: :codification_field,
                        codification_kind: :discipline,
                        title: 'Discipline',
                        command: 'Select a discipline')
    document_fields.new(kind: :codification_field,
                        codification_kind: :document_type,
                        title: 'Document type',
                        command: 'Select a document type')
    document_fields.new(kind: :codification_field,
                        codification_kind: :document_number,
                        title: 'Document number',
                        command: 'Select a document number')
  end
end
