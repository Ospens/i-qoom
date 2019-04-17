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
end
