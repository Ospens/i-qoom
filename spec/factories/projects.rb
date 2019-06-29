FactoryBot.define do
  factory :project_admins_step, class: "Project" do
    association     :user
    creation_step   { "admins" }
    after(:build) do |instance|
      instance.admins << FactoryBot.build(:project_administrator)
    end
    factory :project_name_step do
      creation_step { "name" }
      name { Faker::Lorem.sentence }
      factory :project_company_datum_step do
        creation_step { "company_datum" }
        company_datum { FactoryBot.build(:project_company_datum_for_project) }
        factory :project_pre_billing_address_step do
          association :company_datum,
            factory: :project_company_datum_without_billing_address
        end
        factory :project do
          creation_step { "done" }
        end
      end
    end
  end
end
