class CreateProjectAdministrators < ActiveRecord::Migration[5.2]
  def change
    create_table :project_administrators do |t|
      t.string  :username
      t.string  :first_name
      t.string  :last_name
      t.string  :email
      t.string  :phone_code
      t.string  :phone_number
      t.integer :project_id
      t.integer :user_id
      t.timestamps
    end
  end
end
