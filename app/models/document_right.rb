class DocumentRight < ApplicationRecord
  enum limit_for: [ :field, :value ], _prefix: true

  belongs_to :user

  belongs_to :document_field

  belongs_to :document_field_value, optional: true

  has_one :convention,
          through: :document_field,
          source: :parent,
          source_type: 'Convention'

  has_one :project, through: :convention

  validates :user,
            :document_field,
            presence: true

  validates :document_field_value,
            presence: true,
            if: :limit_for_value?

  validate :limit_for_based_on_field_kind

  def self.attributes_for_edit(project, only_new_users = false)
    kinds =
      DocumentField.codification_kinds.slice(:originating_company, :discipline, :document_type).values
    fields =
      project.conventions.active.document_fields.where(codification_kind: kinds)
    user_ids =
      DocumentRight.where(document_field: fields, enabled: true).pluck(:user_id).uniq
    users =
      only_new_users ? User.where.not(id: user_ids) : User.where(id: user_ids)
    attrs = {
      fields: {}, # used just for info
      users: []
    }
    fields.each do |field|
      values = DocumentFieldValue.where(document_field: field).as_json(only: [:id, :value])
      attrs[:fields][field.codification_kind] = { id: field.id, values: values }
    end
    users.each do |user|
      rights_attrs = []
      fields.each do |field|
        field.document_field_values.each do |value|
          right =
            user.document_rights.where(document_field: field,
                                       document_field_value: value,
                                       limit_for: :value).first_or_create
          rights_attrs << right.attributes.slice('id',
                                                 'document_field_id',
                                                 'document_field_value_id',
                                                 'enabled',
                                                 'view_only')
        end
      end
      attrs[:users] << {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        document_rights: rights_attrs
      }
    end
    attrs
  end

  private

  def limit_for_based_on_field_kind
    if document_field.can_limit_by_value? && !limit_for_value?
      errors.add(:limit_for, :must_be_limit_for_value)
    elsif !document_field.can_limit_by_value? && !limit_for_field?
      errors.add(:limit_for, :must_be_limit_for_field)
    end
  end
end
