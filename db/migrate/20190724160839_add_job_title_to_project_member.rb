class AddJobTitleToProjectMember < ActiveRecord::Migration[5.2]
  def change
    add_column :project_members, :job_title, :string
  end
end
