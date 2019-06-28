require 'rails_helper'

RSpec.describe Project, type: :model do
  context "creation_step" do
    subject { FactoryBot.build(:project_done_step) }
    it { is_expected.to define_enum_for(:creation_step)
            .with_values([ :admins,
                           :name,
                           :company_datum,
                           :billing_address,
                           :done ])
            .with_prefix(:creation_step) }
  end

  context "creation step is admins" do
    subject { FactoryBot.build(:project,
                               creation_step: :admins) }
    it { is_expected.not_to validate_presence_of(:name) }
    it { is_expected.not_to validate_length_of(:name).is_at_least(3).is_at_most(255) }
  end

  context "creation step is not admins" do
    subject { FactoryBot.build(:project,
                               creation_step: [ :name,
                                                :company_datum,
                                                :billing_address,
                                                :done ].sample) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_least(3)
                                                 .is_at_most(255) }
  end

  context "creation_step is company_datum" do
    subject { FactoryBot.build(:project, creation_step: :company_datum) }
    it { is_expected.to validate_presence_of(:company_datum) }
  end

  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:admins).class_name('ProjectAdministrator') }
  it { is_expected.to accept_nested_attributes_for(:admins) }
  it { is_expected.to accept_nested_attributes_for(:company_datum)
                        .update_only(true) }
  it { is_expected.to validate_presence_of(:admins) }


  context "update_creation_step_to_done" do
    context "when is not ready" do
      subject { FactoryBot.create(:project, creation_step: :company_datum,
                company_datum: FactoryBot.build(:project_company_datum_without_billing_address)) }
      it { expect(subject.creation_step).not_to eq("done") }
    end
    context "when is ready" do
      subject { FactoryBot.create(:project_company_datum_step) }

      it { expect(subject.creation_step).to eq("done") }
    end
  end
end
