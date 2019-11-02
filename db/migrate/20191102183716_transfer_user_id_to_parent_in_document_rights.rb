# one time use migration
class TransferUserIdToParentInDocumentRights < ActiveRecord::Migration[5.2]
  def up
    DocumentRight.all.each do |right|
      right.update_columns(parent_id: right.user_id, parent_type: 'User')
    end
  end
end
