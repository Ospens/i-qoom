FactoryBot.define do
  factory :project_administrator do
    sequence(:email) { Faker::Internet.email }
  end
end
