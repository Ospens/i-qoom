class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.string :type
      t.references :main, index: true, foreign_key: { to_table: :documents }
      t.references :revision, index: true, foreign_key: { to_table: :documents }
      t.integer :issued_for
      t.string :email_title
      t.boolean :email_title_like_document, default: true
      t.text :email_text
      t.string :revision_number
      t.string :revision_version
      t.timestamps
    end
  end
end
