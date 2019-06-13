FactoryBot.define do
  factory :project_member do
    sequence(:email) { Faker::Internet.email }
  end
end