FactoryBot.define do
  factory :user do
    sequence(:email)      { Faker::Internet.email }
    password              { "password1" }
    password_confirmation { "password1" }
    sequence(:username)   { Faker::Internet.unique.user_name[0..17] }
    sequence(:first_name) { Faker::Name.first_name }
    sequence(:last_name)  { Faker::Name.last_name }
    sequence(:country)    { ISO3166::Country.codes.sample }
    accept_terms_and_conditions { "1" }
    confirmed_at          { Time.now }
  end
end
