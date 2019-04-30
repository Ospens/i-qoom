class CreateProjectCompanyData < ActiveRecord::Migration[5.2]
  def change
    create_table :project_company_data do |t|
      t.string  :registration_number
      t.string  :vat_id
      t.integer :project_id
    end
  end
end
