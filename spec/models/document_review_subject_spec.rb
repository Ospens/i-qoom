require 'rails_helper'

RSpec.describe DocumentReviewSubject, type: :model do
  it 'has reviewers' do
    subject = FactoryBot.create(:document_review_subject)
    reviewer = FactoryBot.create(:user)
    subject.reviewer_ids = [reviewer.id]
    expect(subject.reviewers).to include(reviewer)
  end

  it 'require at least 1 reviewer' do
    subject = FactoryBot.create(:document_review_subject)
    expect(subject).to be_valid
    subject.reviewer_ids = []
    expect(subject).to_not be_valid
  end
end
