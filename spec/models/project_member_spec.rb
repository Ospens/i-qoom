require 'rails_helper'

RSpec.describe ProjectMember, type: :model do
  it { is_expected.to belong_to(:project).inverse_of(:members) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

  context "add_user" do
    it 'should be added when created' do
      user = FactoryBot.create(:user)
      project =
        FactoryBot.create(:project,
          members: [ FactoryBot.build(:project_member,
                                      email: user.email) ] )
      expect(project.members.first.user).to eq(user)
    end
    it "shouldn't be added if there is no such user" do
      project =
        FactoryBot.create(:project,
          members: [ FactoryBot.build(:project_member) ] )
      expect(project.members.first.user).to eq(nil)
    end
    it "shouldn't be replaced after updating" do
      user = FactoryBot.create(:user)
      project =
        FactoryBot.create(:project,
          members: [ FactoryBot.build(:project_member,
                                      email: user.email) ] )
      second_user = FactoryBot.create(:user)
      project.members.first.update(email: second_user.email)
      expect(project.members.first.user).not_to eq(second_user)
    end
  end

end
