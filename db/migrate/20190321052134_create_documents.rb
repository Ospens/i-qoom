class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.integer :issued_for
      t.string :email_title
      t.boolean :email_title_like_document, default: true
      t.text :email_text
      t.timestamps
    end
  end
end
