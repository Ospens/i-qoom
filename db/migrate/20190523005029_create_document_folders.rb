class CreateDocumentFolders < ActiveRecord::Migration[5.2]
  def change
    create_table :document_folders do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
