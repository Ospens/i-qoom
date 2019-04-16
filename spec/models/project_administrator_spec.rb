require 'rails_helper'

RSpec.describe ProjectAdministrator, type: :model do
  it { is_expected.to belong_to(:project) }
  it { is_expected.not_to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }
end
