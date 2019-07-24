require 'rails_helper'

RSpec.describe ProjectMember, type: :model do

  it { is_expected.to define_enum_for(:creation_step)
            .with_values([ :employment_type,
                           :company_type,
                           :company_data,
                           :details,
                           :completed ])
            .with_prefix(:creation_step) }
  it { is_expected.to define_enum_for(:employment_type)
            .with_values([ :employee,
                           :internal_contractor,
                           :external_contractor ])
            .with_prefix(:employment_type) }
  it { is_expected.to define_enum_for(:company_type)
            .with_values([ :project_company,
                           :parent_company,
                           :joint_venture_company ])
            .with_prefix(:company_type) }

  it { is_expected.to belong_to(:project).inverse_of(:members) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to belong_to(:company_address)
                        .class_name("Address")
                        .required(false) }

  it { is_expected.to belong_to(:discipline) }

  it { is_expected.to accept_nested_attributes_for(:company_address)
                        .update_only(true) }

  context "creation step is" do
    context "employment_type first step" do
      subject { FactoryBot.build(:project_member,
                                 creation_step: :employment_type) }
      it { is_expected.to validate_presence_of(:employment_type) }
    end
    context "company_type second step" do
      subject { FactoryBot.build(:project_member,
                                 creation_step: :company_type) }
      it { is_expected.to validate_presence_of(:company_type) }
    end
    context "company_data third step" do
      subject { FactoryBot.build(:project_member,
                                 creation_step: :company_data) }
      it { is_expected.to validate_presence_of(:company_address) }
    end
    context "details fourth step" do
      subject { FactoryBot.build(:project_member,
                                 creation_step: :details) }
      it { is_expected.to validate_presence_of(:email) }
      it { is_expected.to allow_value(Faker::Internet.email)
                            .for(:email) }
      it { is_expected.to validate_presence_of(:first_name) }
      it { is_expected.to validate_length_of(:first_name)
                                .is_at_least(3)
                                .is_at_most(255) }

      it { is_expected.to validate_presence_of(:last_name) }
      it { is_expected.to validate_length_of(:last_name)
                                .is_at_least(3)
                                .is_at_most(255) }
    end
  end

  context "update_creation_step_to_completed" do
    context "when is not ready" do
      subject { FactoryBot.create(:project_member_company_data) }
      it { expect(subject.creation_step).not_to eq("completed") }
    end
    context "when is ready" do
      subject { FactoryBot.create(:project_member_details) }
      it { expect(subject.creation_step).to eq("completed") }
    end
  end

end
