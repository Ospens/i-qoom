class AddCreationStepToProject < ActiveRecord::Migration[5.2]
  def up
    add_column :projects, :creation_step, :integer, default: 0
  end
  def down
    remove_column :projects, :creation_step
  end
end
