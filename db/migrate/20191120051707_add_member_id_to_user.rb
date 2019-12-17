class AddMemberIdToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :member_id, :string
    add_index :users, :member_id, unique: true
  end
end
