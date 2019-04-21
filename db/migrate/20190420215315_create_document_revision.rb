class CreateDocumentRevision < ActiveRecord::Migration[5.2]
  def change
    create_table :document_revisions do |t|
      t.references :document_main, foreign_key: true
      t.string :revision_number
    end
  end
end
