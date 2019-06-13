class CreateProjectMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :project_members do |t|
      t.integer :employment_type
      t.integer :company_type
      t.string  :first_name
      t.string  :last_name
      t.string  :email
      t.string  :phone_code
      t.string  :phone_number
      t.string  :member_id
      t.integer :project_id
      t.integer :user_id
      t.timestamps
    end
  end
end
