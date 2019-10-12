FactoryBot.define do
  factory :document_review_owner do
    project
    user
    originating_company { "MyString" }
  end
end
