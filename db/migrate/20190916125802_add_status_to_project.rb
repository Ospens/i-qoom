class AddStatusToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :status, :integer
    add_column :projects, :start_date, :datetime
    add_column :projects, :archived, :boolean, default: false
  end
end
