class DropProjectAdministrator < ActiveRecord::Migration[5.2]
  def change
  	drop_table :project_administrators
  end
end
