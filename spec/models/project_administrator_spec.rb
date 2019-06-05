require 'rails_helper'

RSpec.describe ProjectAdministrator, type: :model do
  it { is_expected.to belong_to(:project) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

  context "add_user" do
    it 'should be added when created' do
      user = FactoryBot.create(:user)
      project =
        FactoryBot.create(:project,
          admins: [FactoryBot.build(:project_administrator,
                                     email: user.email)] )
      expect(project.admins.first.user).to eq(user)
    end
    it "shouldn't be added if there is no such user" do
      project = FactoryBot.create(:project)
      expect(project.admins.first.user).to eq(nil)
    end
    it "shouldn't be replaced after updating" do
      user = FactoryBot.create(:user)
      project =
        FactoryBot.create(:project,
          admins: [FactoryBot.build(:project_administrator,
                                     email: user.email)] )
      second_user = FactoryBot.create(:user)
      project.admins.first.update(email: second_user.email)
      expect(project.admins.first.user).not_to eq(second_user)
    end
  end

  context "remove admin" do
    let(:project) { FactoryBot.create(:project_done_step) }
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
