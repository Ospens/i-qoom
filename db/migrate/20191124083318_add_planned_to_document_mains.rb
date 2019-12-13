class AddPlannedToDocumentMains < ActiveRecord::Migration[5.2]
  def change
    add_column :document_mains, :planned, :boolean, default: false
  end
end
