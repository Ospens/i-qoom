class AddDocIdToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :doc_id, :string
  end
end
