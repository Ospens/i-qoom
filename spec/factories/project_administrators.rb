FactoryBot.define do
  factory :project_administrator do
    sequence(:email) { Faker::Internet.email }
    status { "active" }
    factory :admin_with_project do
      project
    end
  end
end
