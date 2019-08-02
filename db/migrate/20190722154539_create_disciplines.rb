class CreateDisciplines < ActiveRecord::Migration[5.2]
  def change
    create_table :disciplines do |t|
      t.string  :name
      t.integer :project_id
    end
    add_column :project_members, :discipline_id, :integer
  end
end