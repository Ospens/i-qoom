class CreateJoinTableDocumentFolderDocumentMain < ActiveRecord::Migration[5.2]
  def change
    create_join_table :document_folders, :document_mains do |t|
      t.index [:document_main_id, :document_folder_id], name: 'index_document_main_id_and_document_folder_id'
      t.index [:document_folder_id, :document_main_id], name: 'index_document_folder_id_and_document_main_id'
    end
  end
end
