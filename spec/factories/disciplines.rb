FactoryBot.define do
  factory :discipline do
    title { Faker::Job.unique.field }
  end
end
