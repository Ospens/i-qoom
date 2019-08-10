class RenameNameToTitleInRoleAndDiscipline < ActiveRecord::Migration[5.2]
  def change
    rename_column :roles, :name, :title
    rename_column :disciplines, :name, :title
  end
end
