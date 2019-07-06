class AddEmailsToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :emails, :text
  end
end
