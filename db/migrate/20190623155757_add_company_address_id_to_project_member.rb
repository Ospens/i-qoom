class AddCompanyAddressIdToProjectMember < ActiveRecord::Migration[5.2]
  def change
    add_column :project_members,
               :company_address_id,
               :integer
  end
end
