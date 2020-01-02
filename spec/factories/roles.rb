FactoryBot.define do
  factory :role do
    title { Faker::Job.unique.title }
    factory :role_admin do
      title { "Project Administrator" }
    end
  end
end
