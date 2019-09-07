class AddProjectCodeToDocumentMains < ActiveRecord::Migration[5.2]
  def change
    add_column :document_mains, :project_code, :string
  end
end
