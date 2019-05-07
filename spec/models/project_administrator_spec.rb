require 'rails_helper'

RSpec.describe ProjectAdministrator, type: :model do
  it { is_expected.to belong_to(:project) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

  context "add_user" do
    it 'should be added' do
      project = FactoryBot.create(:project)
      project.admins.first.update(email: project.user.email)
      expect(project.admins.first.user).to eq(project.user)
    end
    it "shouldn't be added" do
      project = FactoryBot.create(:project)
      expect(project.admins.first.user).to eq(nil)
    end
    it "shouldn't be replaced" do
      project = FactoryBot.create(:project)
      project.admins.first.update(email: project.user.email)
      project.admins.first.update(email: Faker::Internet.email)
      expect(project.admins.first.user).to eq(project.user)
    end
  end
end
