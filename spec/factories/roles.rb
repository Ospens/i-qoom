FactoryBot.define do
  factory :role do
    title { Faker::Job.unique.title }
  end
end
