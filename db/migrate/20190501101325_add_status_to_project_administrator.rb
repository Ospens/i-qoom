class AddStatusToProjectAdministrator < ActiveRecord::Migration[5.2]
  def change
    add_column :project_administrators, :status, :integer, default: 0
  end
end
