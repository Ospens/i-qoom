FactoryBot.define do
  factory :role do
    name { Faker::Job.unique.title }
  end
end
