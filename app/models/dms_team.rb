class DmsTeam < ApplicationRecord
  belongs_to :project

  has_many :document_rights,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  accepts_nested_attributes_for :document_rights

  has_and_belongs_to_many :users

  before_create :assign_document_rights

  def convention_fields
    kinds =
      DocumentField.codification_kinds.slice(:originating_company,
                                             :discipline,
                                             :document_type).values
    project.conventions.active.document_fields.where(codification_kind: kinds)
  end

  private

  def assign_document_rights
    convention_fields.each do |field|
      field.document_field_values.each do |value|
        document_rights.new(document_field: field,
                            document_field_value: value,
                            limit_for: :value)
      end
    end
  end
end
