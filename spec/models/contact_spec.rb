require 'rails_helper'

describe Contact, type: :model do

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:phone_number) }
  it { is_expected.to validate_presence_of(:text) }

  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

end