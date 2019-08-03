FactoryBot.define do
  factory :document_review_subject do
    status { 1 }
    title { "MyString" }
    document_revision
    user
    review_issuer { create(:user) }
    reviewers { [create(:user)] }
  end
end
