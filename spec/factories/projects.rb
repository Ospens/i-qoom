FactoryBot.define do
  factory :project do
    sequence(:name) { Faker::Lorem.sentence }
    association     :user
    creation_step   { "admins" }
    after(:build) do |instance|
      instance.admins << FactoryBot.build(:project_administrator)
    end
  end
end
