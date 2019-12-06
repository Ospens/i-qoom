require 'rails_helper'

describe User, type: :model do

  [:email,
   :first_name,
   :last_name,
   :username,
   :password].each do |value|
    it { is_expected.to validate_presence_of(value) }
  end

  it { is_expected.to have_many(:sent_messages)
                        .class_name("Message")
                        .with_foreign_key(:sender_id) }
  it { is_expected.to have_many(:message_recipients) }
  it { is_expected.to have_many(:received_messages)
                        .through(:message_recipients)
                        .source(:message) }

  it { is_expected.to have_many(:project_administrators) }
  it { is_expected.to have_many(:admin_projects)
                        .through(:project_administrators)
                        .source(:project) }

  it { is_expected.to have_many(:project_members) }
  it { is_expected.to have_many(:member_projects)
                        .through(:project_members)
                        .source(:project) }

  it { is_expected.to validate_length_of(:first_name)
                        .is_at_least(2)
                        .is_at_most(255) }

  it { is_expected.to validate_length_of(:last_name)
                        .is_at_least(2)
                        .is_at_most(255) }

  context "validates_presence_of password_confirmation" do
    subject { FactoryBot.create(:user) }
    it { is_expected.to validate_presence_of(:password_confirmation) }
  end

  it "shouldn't validates_presence_of password_confirmation" do
    user = FactoryBot.create(:user)
    user.update(username: "newusername")
    expect(user).to be_valid
  end

  it { is_expected.to validate_acceptance_of(:accept_terms_and_conditions).on(:create) }
  it { is_expected.not_to allow_value(nil).for(:accept_terms_and_conditions).on(:create) }
  it { is_expected.not_to validate_acceptance_of(:accept_terms_and_conditions).on(:update) }
  it { is_expected.to allow_value(nil).for(:accept_terms_and_conditions).on(:update) }


  it { is_expected.to validate_inclusion_of(:country)
                        .in_array(ISO3166::Country.codes) }

  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

  context "uniqueness of username" do
    subject { FactoryBot.create(:user) }
    it { is_expected.to validate_uniqueness_of(:username) }
  end

  it { is_expected.to validate_length_of(:username).is_at_most(18) }

  it { is_expected.to allow_value(Faker::Internet.unique.user_name[0..17])
                        .for(:username) }
  it { is_expected.not_to allow_value(Faker::Name.name)
                        .for(:username) }

  context "sends confirmation email" do
    it "should be sent" do
      user = FactoryBot.create(:user, confirmed_at: nil)
      expect(user.confirmation_sent_at).to be_present
      expect(user.confirmed?).not_to be_truthy
    end
    it "shouldn't be sent" do
      project_member = FactoryBot.create(:project_member_pending)
      user = FactoryBot.create(:user,
                               confirmed_at: nil,
                               project_member_id: project_member.id)
      expect(user.confirmation_sent_at).to be_nil
      expect(user.confirmed?).to be_truthy
    end
  end

  it "should have valid member_id" do
    user = FactoryBot.create(:user)
    expect(user.member_id.last(5).to_i).to eq user.id
    expect(user.member_id).to be_truthy
  end

  context "add_data_from_project_member" do
    it "on create with project_member_id" do
      project_member = FactoryBot.create(:project_member_pending)
      user = FactoryBot.create(:user,
                               project_member_id: project_member.id)
      expect(user.first_name).to eq(project_member.first_name)
    end
    it "on update with project_member_id" do
      user = FactoryBot.create(:user)
      project_member = FactoryBot.create(:project_member_pending)
      user.update(project_member_id: project_member.id)
      expect(user.first_name).not_to eq(project_member.first_name)
    end
  end

  context "add_user_id_to_project_member" do
    it "after create with project_member_id" do
      project_member = FactoryBot.create(:project_member_pending)
      user = FactoryBot.create(:user,
                               project_member_id: project_member.id)
      expect(project_member.reload.user).to be_present
      expect(user.reload.project_members).not_to be_empty
    end
    it "after create without project_member_id" do
      user = FactoryBot.create(:user)
      expect(user.reload.project_members).to be_empty
    end
    it "after update with project_member_id" do
      user = FactoryBot.create(:user)
      project_member = FactoryBot.create(:project_member_pending)
      user.update(project_member_id: project_member.id)
      expect(project_member.reload.user).not_to be_present
      expect(user.reload.project_members).to be_empty
    end
  end
end
