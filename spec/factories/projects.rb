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
      association :company_datum, factory: :project_company_datum
    end
    factory :project_pre_billing_address_step do
      creation_step { "company_datum" }
      association :company_datum,
        factory: :project_company_datum_without_billing_address
    end
    factory :project_done_step do
      creation_step { "done" }
      association :company_datum, factory: :project_company_datum
    end
  end
end
