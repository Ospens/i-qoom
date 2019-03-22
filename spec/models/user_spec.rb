require 'rails_helper'

describe User, type: :model do

  [:email,
   :first_name,
   :last_name,
   :country,
   :username,
   :password].each do |value|
    it { is_expected.to validate_presence_of(value) }
  end
  it { is_expected.to validate_presence_of(:password_confirmation).on(:create) }
  it { is_expected.to validate_presence_of(:password_confirmation).on(:password_changed?) }
  it { is_expected.not_to validate_presence_of(:password_confirmation).on(:update) }

  it { is_expected.to validate_acceptance_of(:accept_terms_and_conditions) }
  it { is_expected.not_to allow_value(nil).for(:accept_terms_and_conditions) }

  it { is_expected.to validate_inclusion_of(:country)
                        .in_array(ISO3166::Country.codes) }

  it { is_expected.to allow_value(Faker::Internet.email).for(:email) }

  it { is_expected.to validate_uniqueness_of(:username) }

  it { is_expected.to validate_length_of(:username).is_at_most(18) }

  it { is_expected.to allow_value(Faker::Internet.unique.user_name[0..17])
                        .for(:username) }
  it { is_expected.not_to allow_value(Faker::Name.name)
                        .for(:username) }

end
