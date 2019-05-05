class AddDocumentRevisionToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :document_revision, foreign_key: true
  end
end
