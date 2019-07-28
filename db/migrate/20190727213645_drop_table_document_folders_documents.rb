class DropTableDocumentFoldersDocuments < ActiveRecord::Migration[5.2]
  def up
    drop_table :document_folders_documents
  end
end
