require 'rails_helper'

describe ProjectAdministratorConfirmation, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:project_admin) { FactoryBot.create(:project).admins.last }

  it "should confirm a user" do
    project_admin.update(email: user.email)
    project_admin_confirmation =
      ProjectAdministratorConfirmation.new(token: project_admin.confirmation_token,
                                           signed_in_user: user)
    project_admin_confirmation.save
    expect(ProjectAdministrator.find_by(id: project_admin.id).user).to eq(user)
  end

  context "shouldn't confirm a user" do
    it "without a token" do
      project_admin.update(email: user.email)
      project_admin_confirmation = 
        ProjectAdministratorConfirmation.new(token: nil,
                                             signed_in_user: user)
      project_admin_confirmation.save
      expect(ProjectAdministrator.find_by(id: project_admin.id).user).not_to eq(user)      
    end
    it "with invalid token" do
      project_admin.update(email: user.email)
      project_admin_confirmation = 
        ProjectAdministratorConfirmation.new(token: "fsff98fgh897g087g0fhgasf",
                                             signed_in_user: user)
      project_admin_confirmation.save
      expect(ProjectAdministrator.find_by(id: project_admin.id).user).not_to eq(user)      
    end
    it "without a signed in user" do
      project_admin.update(email: user.email)
      project_admin_confirmation = 
        ProjectAdministratorConfirmation.new(token: project_admin.confirmation_token,
                                             signed_in_user: nil)
      project_admin_confirmation.save
      expect(ProjectAdministrator.find_by(id: project_admin.id).user).not_to eq(user)      
    end
    it "with a wrong id" do
      project_admin.update(email: user.email)
      token = ::JsonWebToken.encode(admin_id: rand(999),
                                    email: project_admin.email)
      project_admin_confirmation = 
        ProjectAdministratorConfirmation.new(token: token,
                                             signed_in_user: user)
      project_admin_confirmation.save
      expect(ProjectAdministrator.find_by(id: project_admin.id).user).not_to eq(user)   
    end
    it "with a wrong email" do
      project_admin.update(email: user.email)
      token = ::JsonWebToken.encode(admin_id: project_admin.id,
                                    email: Faker::Internet.email)
      project_admin_confirmation = 
        ProjectAdministratorConfirmation.new(token: token,
                                             signed_in_user: user)
      project_admin_confirmation.save
      expect(ProjectAdministrator.find_by(id: project_admin.id).user).not_to eq(user)
    end

    it "if already confirmed" do
      project_admin.update(email: user.email)
      project_admin_confirmation =
        ProjectAdministratorConfirmation.new(token: project_admin.confirmation_token,
                                             signed_in_user: user)
      project_admin_confirmation.save
      expect(project_admin_confirmation.save).to be_falsy
    end
  end
end
