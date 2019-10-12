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

  it 'has comments' do
    subject = FactoryBot.create(:document_review_subject)
    subject.comments.create(text: '111')
    expect(subject.comments.length).to eql(1)
  end

  it 'has reviews completed' do
    subject = FactoryBot.create(:document_review_subject)
    reviewer = FactoryBot.create(:user)
    subject.review_completes << reviewer
    expect(subject.review_completes).to include(reviewer)
  end

  it '#can_complete_review?' do
    subject = FactoryBot.create(:document_review_subject)
    user1 = FactoryBot.create(:user)
    user2 = FactoryBot.create(:user)
    expect(subject.can_complete_review?(user1)).to eql(false)
    expect(subject.can_complete_review?(user2)).to eql(false)
    subject.reviewers << user1
    expect(subject.can_complete_review?(user1)).to eql(true)
    subject.update!(review_issuer: user2)
    expect(subject.can_complete_review?(user2)).to eql(true)
  end

  it 'should validate that tag belongs to project' do
    subject = FactoryBot.create(:document_review_subject)
    project = FactoryBot.create(:project)
    tag1 = project.document_review_tags.create!(name: '111')
    tag2 = subject.project.document_review_tags.create!(name: '111')
    expect { subject.tag_ids = [tag1.id] }.to\
      raise_error(ActiveRecord::RecordInvalid, /Validation failed/)
    expect { subject.tag_ids = [tag2.id] }.to_not raise_error
  end
end
