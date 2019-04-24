class CreateDmsSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :dms_settings do |t|
      t.string :name
      t.string :value
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
