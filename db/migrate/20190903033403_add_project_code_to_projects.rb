class AddProjectCodeToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :project_code, :string
  end
end
