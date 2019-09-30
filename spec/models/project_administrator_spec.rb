require 'rails_helper'

RSpec.describe ProjectAdministrator, type: :model do
  it { is_expected.to belong_to(:project).inverse_of(:admins) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }
  it { is_expected.to belong_to(:user).required(false) }
  it { is_expected.to belong_to(:inviter)
                        .class_name("User")
                        .required(false) }

  context "validate email uniqueness through exclusion" do
    it "shouldn't be valid" do
      user = FactoryBot.create(:user)
      project_admin =
        FactoryBot.create(:project_with_admins,
                          user_id: user.id).admins.last
      project_admin.update(email: user.email)
      expect(project_admin).not_to be_valid
    end
  end
  context "add_user" do
    it 'creator should be added when created' do
      user = FactoryBot.create(:user)
      project =
        FactoryBot.create(:project, user: user)
      expect(project.admins.first.user).to eq(user)
    end
    context "second admin cases" do
      it "user should be added if he exists" do
        user = FactoryBot.create(:user)
        project =
          FactoryBot.create(:project)
        project.update(admins_attributes: { id: "",
                                            email: user.email })
        expect(project.admins.last.user).to eq(user)
      end
      it "user shouldn't be added if there is no such user" do
        project = FactoryBot.create(:project)
        project.update(admins_attributes: { id: "",
                                            email: "notarealemail@email.com" })
        expect(project.admins.last.user).to eq(nil)
      end
      it "user shouldn't be replaced after updating" do
        user = FactoryBot.create(:user)
        project = FactoryBot.create(:project)
        project.update(admins_attributes: { id: "",
                                            email: user.email })
        second_user = FactoryBot.create(:user)
        second_admin_id = project.admins.last.id
        project.update(admins_attributes: { id: second_admin_id,
                                            email: second_user.email })
        expect(project.admins.last.user).not_to eq(second_user)
      end
    end
  end

  it "send_confirmation_email" do
    project_admin = FactoryBot.create(:admin_with_project, status: "unconfirmed")

    expect(project_admin.inviter_id).to be_present
    expect(project_admin.first_confirmation_sent_at).to be_present
    expect(project_admin.confirmation_resent_at).to be_nil
    expect(project_admin.status).to eq("awaiting_confirmation")

    project_admin.send_confirmation_email
    expect(project_admin.confirmation_resent_at).to be_present
    expect(project_admin.status).to eq("awaiting_confirmation")
  end

  context "remove admin" do
    let(:project) { FactoryBot.create(:project) }
    it "admin should be removed" do
      project.admins << FactoryBot.build(:project_administrator)
      project.save
      project.admins.first.remove
      expect(project.admins.count).to eq(1)
    end
    it "admin shouldn't be removed if he is the last one" do
      project.admins.first.remove
      expect(project.admins.count).to eq(1)
    end
  end
end
