class CreateDocumentRights < ActiveRecord::Migration[5.2]
  def change
    create_table :document_rights do |t|
      t.references :user, foreign_key: true
      t.references :document_field, foreign_key: true
      t.integer :limit_for

      t.timestamps
    end
  end
end
