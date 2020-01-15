class CreateDocumentEmailGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :document_email_groups do |t|
      t.references :document, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
