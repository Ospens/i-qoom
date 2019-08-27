class AddInviterToProjectAdministratorAndProjectMember < ActiveRecord::Migration[5.2]
  def change
    add_column :project_administrators, :inviter_id, :integer
    add_column :project_members, :inviter_id, :integer
  end
end
