class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
      t.string  :name
      t.integer :project_id
    end
    add_column :project_members, :role_id, :integer
  end
end
