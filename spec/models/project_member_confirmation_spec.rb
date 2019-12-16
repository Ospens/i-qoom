require 'rails_helper'

describe ProjectMemberConfirmation, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:project_member) { FactoryBot.create(:project_member_pending) }


  it { is_expected.to validate_presence_of(:token) }

  it "should have a project_member" do
    project_member_confirmation =
      ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                    signed_in_user: user)
    expect(project_member_confirmation.project_member).to be_truthy 
  end

  it "should confirm a user" do
    project_member.update(email: user.email)
    project_member_confirmation =
      ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                    signed_in_user: user)
    project_member_confirmation.accept
    project_member.reload
    expect(project_member.creation_step).to eq("active") 
  end

  context "shouldn't confirm a user" do
    it "without a token" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: nil,
                                      signed_in_user: user)
      project_member_confirmation.accept
      project_member.reload
      expect(project_member.creation_step).not_to eq("active")      
    end
    it "with invalid token" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: "fsff98fgh897g087g0fhgasf",
                                      signed_in_user: user)
      project_member_confirmation.accept
      project_member.reload
      expect(project_member.creation_step).not_to eq("active")   
    end
    it "without a signed in user" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: nil)
      project_member_confirmation.accept
      project_member.reload
      expect(project_member.creation_step).not_to eq("active")   
    end
    it "with a wrong id" do
      project_member.update(email: user.email)
      token = ::JsonWebToken.encode(member_id: rand(999))
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: token,
                                      signed_in_user: user)
      project_member_confirmation.accept
      project_member.reload
      expect(project_member.creation_step).not_to eq("active")   
    end
    it "with a wrong user" do
      token = ::JsonWebToken.encode(member_id: project_member.id)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: token,
                                      signed_in_user: user)
      project_member_confirmation.accept
      project_member.reload
      expect(project_member.creation_step).not_to eq("active")
    end
    it "with not pending status" do
      project_member =
        FactoryBot.create(:project_member_company_data, email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: user)
      expect(project_member_confirmation.accept).to be_falsy
    end
    it "with active status" do
      project_member =
        FactoryBot.create(:project_member, email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: user)
      expect(project_member_confirmation.accept).to be_falsy
    end
  end

  context "registration_required?" do
    it "should be true" do
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: [ nil, user ].sample)
      project_member_confirmation.accept
      expect(project_member_confirmation.registration_required?).to be_truthy
    end
    it "should be false" do
      project_member.update(email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: user)
      project_member_confirmation.accept
      expect(project_member_confirmation.registration_required?).to be_falsy
    end
  end

  context "unauthorized?" do
    it "should be true" do
      different_user = FactoryBot.create(:user)
      project_member.update(email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: [ nil, different_user ].sample)
      project_member_confirmation.accept
      expect(project_member_confirmation.unauthorized?).to be_truthy
    end
    it "should be false" do
      project_member.update(email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                      signed_in_user: user)
      project_member_confirmation.accept
      expect(project_member_confirmation.unauthorized?).to be_falsy
    end 
  end
end
