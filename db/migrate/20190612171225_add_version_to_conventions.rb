class AddVersionToConventions < ActiveRecord::Migration[5.2]
  def change
    add_column :conventions, :version, :integer
  end
end
