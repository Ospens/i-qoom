class CreateConventionFields < ActiveRecord::Migration[5.2]
  def change
    create_table :convention_fields do |t|
      t.references :convention, foreign_key: true
      t.integer :kind
      t.integer :codification_kind
      t.integer :column
      t.integer :row
      t.boolean :required, default: false
      t.boolean :multiselect, default: false
      t.string :title
      t.string :command
      t.text :value

      t.timestamps
    end
  end
end
