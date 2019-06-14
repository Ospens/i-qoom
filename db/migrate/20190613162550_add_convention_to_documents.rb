class AddConventionToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :convention, foreign_key: true
  end
end
