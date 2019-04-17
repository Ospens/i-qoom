class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :company_name
      t.string :street_number
      t.string :house_number
      t.string :city
      t.string :postcode
      t.string :country
      t.string :district
      t.string :district_court
    end
  end
end
