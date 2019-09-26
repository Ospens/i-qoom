class Convention < ApplicationRecord
  attr_accessor :project_code

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

  validates :version,
            presence: true,
            numericality: { greater_than_or_equal_to: 1 }

  validate :document_fields_update,
           if: -> { last_convention.present? && last_convention != self }

  validate :validate_presence_of_required_fields,
           if: -> { version == 1 }

  before_validation :set_version

  before_validation :build_default_fields,
                    on: :create,
                    if: -> { !document_fields.any? &&
                             !project.conventions.where(number: number).any? }

  after_save :assign_revision_version_field,
             if: -> { document_fields.find_by(codification_kind: :revision_version).blank? }
  # there should be way to detect active convention
  scope :active, -> { where(number: 1).last_version }

  scope :last_version, -> { order(version: :asc).last }

  def build_default_fields
    field =
      document_fields.new(kind: :select_field,
                          codification_kind: :originating_company,
                          title: 'Originating company',
                          command: 'Select originating company',
                          column: 1,
                          row: 3)
    # I talked to Yasser. By default the first three positions are
    # code "XXX" name "Default". As soon as the user adds a codification to the
    # first positions "XXX Default" is overwritten. If the user wants to delete
    # it again, then the last position become mandatory and not deletable.
    # (c) Norman
    field.document_field_values.new(value: 'XXX', title: 'Default', position: 1)
    if number == 2
      field =
        document_fields.new(kind: :select_field,
                            codification_kind: :receiving_company,
                            title: 'Receiving company',
                            command: 'Select receiving company',
                            column: 1,
                            row: 4)
      field.document_field_values.new(value: 'XXX', title: 'Default', position: 1)
    end
    field =
      document_fields.new(kind: :select_field,
                          codification_kind: :discipline,
                          title: 'Discipline',
                          command: 'Select a discipline',
                          column: 1,
                          row: number == 2 ? 5 : 4)
    field.document_field_values.new(value: 'XXX', title: 'Default', position: 1)
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
    field =
      document_fields.new(kind: :select_field,
                          codification_kind: :document_type,
                          title: 'Document type',
                          command: 'Select a document type',
                          column: 2,
                          row: 1)
    field.document_field_values.new(value: 'XXX', title: 'Default', position: 1)
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

  def attributes_for_edit
    json = as_json(include: {
      document_fields: {
        include: {
          document_field_values: { except: :id } },
          except: :id
        }
      },
      except: :id)
    fields = json['document_fields']
    version = fields.detect{ |i| i['codification_kind'] == 'revision_version' }
    fields.delete(version)
    json['project_code'] = project.project_code
    json
  end

  def attributes_for_update_field_titles
    json = as_json(include: {
      document_fields: {
        include: {
          document_field_values: { only: [:id, :title, :value] } },
          only: [:id, :codification_kind]
        }
      },
      except: :id)
    fields = json['document_fields']
    version = fields.detect{ |i| i['codification_kind'] == 'revision_version' }
    fields.delete(version)
    json['project_code'] = project.project_code
    json
  end

  def last_convention
    project.conventions.where(number: number).last_version
  end

  private

  def assign_revision_version_field
    document_fields.create(kind: :hidden_field, codification_kind: :revision_version, column: 1)
  end

  def set_version
    self.version = last_convention.present? ? last_convention.version + 1 : 1
  end

  def document_fields_update
    # Yasser: Yes, the DMS Master can add or delete the selections for the
    # different fields (document type, Contractor, etc) and also
    # the abbreviation for the project name(i.g. „MVP“).
    # But deleting any field entirety is not possible.
    # This means that the structure of the convention is not changeable.
    last_convention_fields =
      last_convention.document_fields.where.not(kind: :hidden_field)
    if last_convention_fields.length != document_fields.length
      errors.add(:document_fields, :wrong_number_of_fields)
    end
    last_convention_fields.each do |field|
      attrs = field.attributes.slice('kind',
                                     'codification_kind',
                                     'column',
                                     'row',
                                     'required',
                                     'multiselect',
                                     'title',
                                     'command')
      contains_field =
        document_fields.detect do |i|
          (attrs.to_a - i.attributes.to_a).empty?
        end.present?
      if !contains_field
        errors.add(:document_fields, :wrong_field_added_to_convention)
      end
    end
  end

  def validate_presence_of_required_fields
    [ :originating_company,
      :discipline,
      :document_native_file,
      :document_type,
      :document_number,
      :revision_number,
      :revision_date ].each do |kind|
      if document_fields.detect{ |i| i['codification_kind'] == kind.to_s }.blank?
        errors.add(:document_fields, "#{kind}_field_in_not_present")
      end
    end
  end
end
