class RemoveProjectIdFromDocuments < ActiveRecord::Migration[5.2]
  def change
    remove_column :documents, :project_id, :integer
  end
end
