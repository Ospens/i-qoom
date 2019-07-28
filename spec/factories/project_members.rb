FactoryBot.define do
  factory :project_member_employment_type,
      class: "ProjectMember" do
    project
    creation_step { "employment_type" }
    employment_type { ProjectMember.employment_types.keys.sample }
    factory :project_member_company_type do
      creation_step { "company_type" }
      company_type { ProjectMember.company_types.keys.sample }
      factory :project_member_company_data do
        creation_step { "company_data" }
        association :company_address,
          factory: :address
        factory :project_member_details do
          creation_step { "details" }
          sequence(:email) { Faker::Internet.email }
          first_name { Faker::Name.first_name }
          last_name  { Faker::Name.last_name }
          factory :project_member do
            creation_step { "completed" }
          end
        end
      end
    end
  end
end