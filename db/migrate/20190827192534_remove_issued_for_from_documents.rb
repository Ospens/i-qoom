class RemoveIssuedForFromDocuments < ActiveRecord::Migration[5.2]
  def change
    remove_column :documents, :issued_for, :integer, default: 0
  end
end
