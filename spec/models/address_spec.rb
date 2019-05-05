require 'rails_helper'

RSpec.describe Address, type: :model do
  it { is_expected.to allow_value("", nil).for(:country) }
  it { is_expected.to validate_inclusion_of(:country)
                        .in_array(ISO3166::Country.codes) }
  it { is_expected.to have_one(:project_company_datum)
                        .with_foreign_key(:company_address_id)
                        .class_name("ProjectCompanyDatum") }
  it { is_expected.to have_one(:project_company_billing_datum)
                        .with_foreign_key(:billing_address_id)
                        .class_name("ProjectCompanyDatum") }

  context "without project_company_datum" do
    [ :company_name,
      :street,
      :house_number,
      :city,
      :postcode,
      :country ].each do |column| 
      it { is_expected.not_to validate_presence_of(column) }
    end
  end

  [ "project_company_datum",
    "project_company_billing_datum" ].each do |company_datum|
    context "with #{company_datum}" do
      subject { FactoryBot.build("address_with_#{company_datum}") }
      [ :company_name,
        :street,
        :house_number,
        :city,
        :postcode,
        :country ].each do |column| 
        it { is_expected.to validate_presence_of(column) }
      end
    end
  end
end
