class CreateDocumentMain < ActiveRecord::Migration[5.2]
  def change
    create_table :document_mains do |t|
      t.references :project, foreign_key: true
    end
  end
end
