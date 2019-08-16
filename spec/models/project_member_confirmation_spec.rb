require 'rails_helper'

describe ProjectMemberConfirmation, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:project_member) { FactoryBot.create(:project_member_pending) }

  it "should confirm a user" do
    project_member.update(email: user.email)
    project_member_confirmation =
      ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                           signed_in_user: user)
    project_member_confirmation.save
    expect(ProjectMember.find_by(id: project_member.id).user).to eq(user)
  end

  context "shouldn't confirm a user" do
    it "without a token" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: nil,
                                             signed_in_user: user)
      project_member_confirmation.save
      expect(ProjectMember.find_by(id: project_member.id).user).not_to eq(user)      
    end
    it "with invalid token" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: "fsff98fgh897g087g0fhgasf",
                                             signed_in_user: user)
      project_member_confirmation.save
      expect(ProjectMember.find_by(id: project_member.id).user).not_to eq(user)      
    end
    it "without a signed in user" do
      project_member.update(email: user.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                             signed_in_user: nil)
      project_member_confirmation.save
      expect(ProjectMember.find_by(id: project_member.id).user).not_to eq(user)      
    end
    it "with a wrong id" do
      project_member.update(email: user.email)
      token = ::JsonWebToken.encode(member_id: rand(999),
                                    email: project_member.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: token,
                                             signed_in_user: user)
      project_member_confirmation.save
      expect(ProjectMember.find_by(id: project_member.id).user).not_to eq(user)   
    end
    it "with a wrong email" do
      project_member.update(email: user.email)
      token = ::JsonWebToken.encode(member_id: project_member.id,
                                    email: Faker::Internet.email)
      project_member_confirmation = 
        ProjectMemberConfirmation.new(token: token,
                                             signed_in_user: user)
      project_member_confirmation.save
      expect(ProjectMember.find_by(id: project_member.id).user).not_to eq(user)
    end
    it "with not pending status" do
      project_member = FactoryBot.create(:project_member_company_data, email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                             signed_in_user: user)
      expect(project_member_confirmation.save).to be_falsy
    end
    it "with active status" do
      project_member = FactoryBot.create(:project_member, email: user.email)
      project_member_confirmation =
        ProjectMemberConfirmation.new(token: project_member.confirmation_token,
                                             signed_in_user: user)
      expect(project_member_confirmation.save).to be_falsy
    end
  end
end
