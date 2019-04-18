FactoryBot.define do
  factory :project do
    sequence(:name) { Faker::Lorem.sentence }
    association     :user
    creation_step   { "admins" }
    after(:build) do |instance|
      instance.admins << FactoryBot.build(:project_administrator)
    end
    factory :project_company_datum_step do
      creation_step { "company_datum" }
    end
  end
end
