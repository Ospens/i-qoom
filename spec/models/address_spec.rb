require 'rails_helper'

RSpec.describe Address, type: :model do
  it { is_expected.to allow_value("", nil).for(:country) }
  it { is_expected.to validate_inclusion_of(:country)
                        .in_array(ISO3166::Country.codes) }
  it { is_expected.to have_one(:project_company_data)
                        .with_foreign_key(:company_address_id)
                        .class_name("ProjectCompanyData") }
  it { is_expected.to have_one(:project_company_billing_data)
                        .with_foreign_key(:billing_address_id)
                        .class_name("ProjectCompanyData") }

  [ :company_name,
    :street,
    :house_number,
    :city,
    :postcode,
    :country,
    :district,
    :district_court ].each do |column| 
    it { is_expected.to validate_length_of(column)
                                .is_at_most(255) }
  end

  context "without project_company_data" do
    [ :company_name,
      :street,
      :house_number,
      :city,
      :postcode,
      :country ].each do |column| 
      it { is_expected.not_to validate_presence_of(column) }
    end
  end

  [ "project_company_data",
    "project_company_billing_data" ].each do |company_data|
    context "with #{company_data}" do
      subject { FactoryBot.build("address_with_#{company_data}") }
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
