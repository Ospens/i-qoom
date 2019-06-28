FactoryBot.define do
  factory :project_member do
    association :project, factory: :project_done_step
    factory :project_member_employment_type do
      creation_step { "employment_type" }
      employment_type { [ :employee,
                          :internal_contractor,
                          :external_contractor ].sample }
      factory :project_member_company_type do
        creation_step { "company_type" }
        company_type { [ :project_company,
                       :parent_company,
                       :joint_venture_company ].sample }
        factory :project_member_company_data do
          creation_step { "company_data" }
          association :company_address,
            factory: :address 
          factory :project_member_details do
            creation_step { "details" }
            sequence(:email) { Faker::Internet.email }
            first_name { Faker::Name.first_name }
            last_name  { Faker::Name.last_name }
            factory :project_member_completed do
              creation_step { "completed" }
            end
          end
        end
      end
    end
  end
end