require 'rails_helper'

RSpec.describe ProjectMember, type: :model do

  it { is_expected.to define_enum_for(:creation_step)
            .with_values([ :employment_type,
                           :company_type,
                           :company_data,
                           :details,
                           :pending,
                           :active ])
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

  it { is_expected.to validate_length_of(:job_title)
                                .is_at_most(255) }

  it { is_expected.to belong_to(:discipline).required(false) }
  it { is_expected.to belong_to(:user).required(false) }
  it { is_expected.to belong_to(:inviter)
                        .class_name("User")
                        .required(false) }
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
                                .is_at_least(2)
                                .is_at_most(255) }

      it { is_expected.to validate_presence_of(:last_name) }
      it { is_expected.to validate_length_of(:last_name)
                                .is_at_least(2)
                                .is_at_most(255) }
    end
  end

  context "update_creation_step_to_completed" do
    context "when is not ready" do
      subject { FactoryBot.create(:project_member_company_data) }
      it { expect(subject.creation_step).not_to eq("pending") }
    end
    context "when is ready" do
      subject { FactoryBot.create(:project_member_details) }
      it { expect(subject.creation_step).to eq("pending") }
    end
  end

  context "add_user" do
    it 'should work when email is present' do
      user = FactoryBot.create(:user)
      project_member =
        FactoryBot.create(:project_member_details, email: user.email)
      expect(project_member.user).to eq(user)
    end
    it "shouldn't work without email" do
      user = FactoryBot.create(:user)
      project_member =
        FactoryBot.create(:project_member_company_data)
      expect(project_member.user).not_to eq(user)
    end
    it "shouldn't work after updating email" do
      user = FactoryBot.create(:user)
      second_user = FactoryBot.create(:user)
      project_member =
        FactoryBot.create(:project_member,
                          email: user.email)
      project_member.update(email: second_user.email)
      expect(project_member.user).not_to eq(second_user)
    end
  end

  it "send_confirmation_email" do
    project_member =
      FactoryBot.create(:project_member,
                        creation_step: [:employment_type,
                                        :company_type,
                                        :company_data,
                                        :details,
                                        :pending,
                                        :active].sample,
                        inviter_id: FactoryBot.create(:user).id)
    project_member.send_confirmation_email
    project_member.save
    project_member.reload
    expect(project_member.confirmation_sent_at).to be_present
  end

  it "invite true" do
    user = FactoryBot.create(:user)
    project_member =
      FactoryBot.create(:project_member_details)
    project_member.update(invite: true,
                          new_inviter_id: user.id)
    project_member.reload
    expect(project_member.confirmation_sent_at).to be_present
    expect(project_member.inviter_id).to eq(user.id)
  end

  context "validates_acceptance of dms and cms modules" do
    it 'if project admin' do
      member = FactoryBot.create(:project).members.first
      member.cms_module_access = false
      member.save
      member.reload
      expect(member.cms_module_access).to be_truthy
    end
    it 'if regular member' do
      member = FactoryBot.create(:project_member,
                                 cms_module_access: true)
      member.cms_module_access = false
      member.save
      member.reload
      expect(member.cms_module_access).to be_falsy
    end
  end

end
