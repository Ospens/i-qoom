class AddDocumentFieldValueToDocumentRights < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_rights, :document_field_value, foreign_key: true
  end
end
