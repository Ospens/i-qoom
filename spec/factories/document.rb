FactoryBot.define do
  factory :document do
    user

    after(:build) do |instance|
      instance.assign_attributes(document_attributes(instance.user))
    end
  end
end
