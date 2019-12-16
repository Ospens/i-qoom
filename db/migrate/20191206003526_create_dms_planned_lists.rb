class CreateDmsPlannedLists < ActiveRecord::Migration[5.2]
  def change
    create_table :dms_planned_lists do |t|
      t.string :name
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
