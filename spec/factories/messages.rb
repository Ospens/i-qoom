FactoryBot.define do
  factory :message do
    association :sender, factory: :user
    subject { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraphs.join }
    before(:create) do |instance|
      instance.message_recipients << FactoryBot.build(:message_recipient)
    end
  end
end
