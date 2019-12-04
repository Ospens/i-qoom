class AddPositionToDocumentMains < ActiveRecord::Migration[5.2]
  def change
    add_column :document_mains, :position, :integer
  end
end
