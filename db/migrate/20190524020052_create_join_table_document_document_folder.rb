class CreateJoinTableDocumentDocumentFolder < ActiveRecord::Migration[5.2]
  def change
    create_join_table :documents, :document_folders do |t|
      t.index [:document_id, :document_folder_id], name: 'index_document_id_and_document_folder_id'
      t.index [:document_folder_id, :document_id], name: 'index_document_folder_id_and_document_id'
    end
  end
end
