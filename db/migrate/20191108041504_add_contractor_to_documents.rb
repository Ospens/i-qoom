class AddContractorToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :contractor, :string
  end
end
