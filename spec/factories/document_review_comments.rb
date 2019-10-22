FactoryBot.define do
  factory :document_review_comment do
    document_review_subject
    user
    text { Faker::Lorem.sentence }
  end
end
