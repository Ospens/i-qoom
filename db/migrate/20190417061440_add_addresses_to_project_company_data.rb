class AddAddressesToProjectCompanyData < ActiveRecord::Migration[5.2]
  def up
    add_column :project_company_data, :billing_address_id, :integer
    add_column :project_company_data, :company_address_id, :integer
  end
  def down
    remove_column :project_company_data, :billing_address_id, :integer
    remove_column :project_company_data, :company_address_id, :integer
  end
end
