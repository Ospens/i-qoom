require 'rails_helper'

RSpec.describe ProjectCompanyDatum, type: :model do

  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_presence_of(:vat_id) }
  it { is_expected.to belong_to(:company_address)
                        .inverse_of(:project_company_datum)
                        .required(true) }
  it { is_expected.to belong_to(:billing_address)
                        .required(false)
                        .inverse_of(:project_company_billing_datum) }

  context "without billing_address" do
    subject { FactoryBot.create(:project_company_datum_without_billing_address,
                same_for_billing_address: [ 1, "1", true, "true" ].sample) }

    it { is_expected.not_to validate_presence_of(:billing_address) }
    it { is_expected.to be_valid }
    it { expect(subject.billing_address).to be_present }
  end

  context "with billing_address" do

    subject { FactoryBot.create(:project_company_datum_billing_address_step) }

    it { is_expected.to validate_presence_of(:billing_address) }
    it { is_expected.to be_valid }
    it { expect(subject.billing_address).to be_present }
  end
end
