FactoryBot.define do
  factory :message do
    association :sender, factory: :user
    association :recipient, factory: :user
    subject { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraphs.join }
  end
end
