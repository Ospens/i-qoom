class AddProjectToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :project, foreign_key: true
  end
end
