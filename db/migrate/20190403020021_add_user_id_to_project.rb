class AddUserIdToProject < ActiveRecord::Migration[5.2]
  def up
    add_column :projects, :user_id, :integer
  end

  def down
    remove_column :projects, :user_id, :integer
  end
end
