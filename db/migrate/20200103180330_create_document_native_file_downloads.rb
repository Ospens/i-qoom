class CreateDocumentNativeFileDownloads < ActiveRecord::Migration[5.2]
  def change
    create_table :document_native_file_downloads do |t|
      t.references :document, foreign_key: true
      t.string :slug
      t.string :password_digest
      t.string :email

      t.timestamps
    end
  end
end
