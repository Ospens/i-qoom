FactoryBot.define do
  factory :discipline do
    name { Faker::Job.unique.field }
  end
end
