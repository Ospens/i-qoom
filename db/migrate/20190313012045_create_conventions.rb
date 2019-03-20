class CreateConventions < ActiveRecord::Migration[5.2]
  def change
    create_table :conventions do |t|
      t.integer :number

      t.timestamps
    end
  end
end
