FactoryBot.define do
  factory :project do
    sequence(:name) { Faker::Lorem.sentence }
    association :user
  end
end
