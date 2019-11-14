class RemoveUserIdFromDocumentRights < ActiveRecord::Migration[5.2]
  def change
    remove_reference :document_rights, :user, index: true, foreign_key: true
  end
end
