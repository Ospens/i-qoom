# Conventions must be created automatically with project
class Convention < ApplicationRecord
  has_many :document_fields,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  accepts_nested_attributes_for :document_fields

  belongs_to :project

  validates_associated :document_fields

  # only first and second Convention on layouts, third is not implemented
  validates :number,
            presence: true,
            inclusion: { in: [1, 2] }
  after_save :assign_revision_version_field,
             if: -> { document_fields.find_by(codification_kind: :revision_version).blank? }
  # there should be way to detect active convention
  scope :active, -> { find_by(number: 1) }

  def build_default_fields
    document_fields.new(kind: :select_field,
                        codification_kind: :originating_company,
                        title: 'Originating company',
                        command: 'Select originating company',
                        column: 1,
                        row: 3)
    if number == 2
      document_fields.new(kind: :select_field,
                          codification_kind: :receiving_company,
                          title: 'Receiving company',
                          command: 'Select receiving company',
                          column: 1,
                          row: 4)
    end
    document_fields.new(kind: :select_field,
                        codification_kind: :discipline,
                        title: 'Discipline',
                        command: 'Select a discipline',
                        column: 1,
                        row: number == 2 ? 5 : 4)
    document_fields.new(kind: :textarea_field,
                        codification_kind: :additional_information,
                        title: 'Additional information',
                        command: 'Information',
                        column: 1,
                        row: number == 2 ? 6 : 5)
    document_fields.new(kind: :upload_field,
                        codification_kind: :document_native_file,
                        title: 'Add native file here',
                        command: 'Click here to browse your files',
                        column: 1,
                        row: number == 2 ? 7 : 6)
    document_fields.new(kind: :select_field,
                        codification_kind: :document_type,
                        title: 'Document type',
                        command: 'Select a document type',
                        column: 2,
                        row: 1)
    document_fields.new(kind: :text_field,
                        codification_kind: :document_number,
                        title: 'Document number',
                        command: 'Select a document number',
                        column: 2,
                        row: 2)
    document_fields.new(kind: :text_field,
                        codification_kind: :revision_number,
                        title: 'Revision number',
                        command: 'Select a revision number',
                        column: 2,
                        row: 3)
    document_fields.new(kind: :date_field,
                        codification_kind: :revision_date,
                        title: 'Revision date',
                        command: 'Select a revision date',
                        column: 2,
                        row: 4)
  end

  private

  def assign_revision_version_field
    document_fields.create(kind: :hidden_field, codification_kind: :revision_version, column: 1)
  end
end
