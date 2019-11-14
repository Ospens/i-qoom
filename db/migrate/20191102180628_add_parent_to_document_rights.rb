class AddParentToDocumentRights < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_rights, :parent, polymorphic: true
  end
end
