class DmsTeamSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :users,
             :document_rights,
             :fields

  def users
    object.users.as_json(only: [:id, :first_name, :last_name, :username])
  end

  def document_rights
    object.document_rights.as_json(only: [:id,
                                          :document_field_id,
                                          :document_field_value_id,
                                          :enabled,
                                          :view_only])
  end

  def fields
    object.convention_fields.map do |field|
      values = DocumentFieldValue.where(document_field: field).as_json(only: [:id, :value])
      { field.codification_kind => { id: field.id, values: values } }
    end
  end
end
