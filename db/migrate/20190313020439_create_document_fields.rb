class CreateDocumentFields < ActiveRecord::Migration[5.2]
  def change
    create_table :document_fields do |t|
      t.references :parent, polymorphic: true
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
