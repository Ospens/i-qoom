class CreateDocumentEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :document_emails do |t|
      t.references :document_email_group, foreign_key: true
      t.string :email
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
