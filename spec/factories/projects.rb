FactoryBot.define do
  factory :project_admins_step, class: "Project" do
    association     :user
    creation_step   { "admins" }
    factory :project_name_step do
      creation_step { "name" }
      name { Faker::Lorem.sentence }
      factory :project_company_data_step do
        creation_step { "company_data" }
        company_data { FactoryBot.build(:project_company_data) }
        factory :project_pre_billing_address_step do
          association :company_data,
            factory: :project_company_data_without_billing_address
        end
        factory :project do
          creation_step { "done" }
          factory :project_with_admins do
            after(:create) do |instance|
              instance.admins << FactoryBot.build(:project_administrator)
            end
          end
          factory :project_with_disciplines do
            after(:create) do |instance|
              FactoryBot.create_list(:discipline, 10, project: instance)
              Faker::UniqueGenerator.clear
            end
          end
          factory :project_with_roles do
            after(:create) do |instance|
              FactoryBot.create_list(:role, 10, project: instance)
              Faker::UniqueGenerator.clear
            end
          end
        end
      end
    end
  end
end
