require 'rails_helper'

describe DocumentReviewSubject, type: :request do
  let(:json) { JSON(response.body) }
  let(:revision) { FactoryBot.create(:document_revision) }
  let!(:document) do
    doc = FactoryBot.create(:document)
    doc.update!(revision: revision)
    doc
  end
  let(:user) { FactoryBot.create(:user) }

  context '#new' do
    it 'anon' do
      get "/api/v1/documents/#{document.id}/document_review_subjects/new"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/documents/#{document.id}/document_review_subjects/new", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('id')
      expect(json).to have_key('document_reference')
      expect(json).to have_key('title')
      expect(json).to have_key('status')
      expect(json).to have_key('comment')
      expect(json).to have_key('review_issuer_id')
      expect(json).to have_key('reviewer_ids')
      expect(json).to_not have_key('created_at')
      expect(json).to_not have_key('updated_at')
    end
  end

  context '#create' do
    it 'anon' do
      post "/api/v1/documents/#{document.id}/document_review_subjects",\
        params: { document_review_subject: { title: '' } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      title = Faker::Lorem.sentence
      review_issuer = FactoryBot.create(:user)
      reviewer = FactoryBot.create(:user)
      comment = Faker::Lorem.sentence
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      post "/api/v1/documents/#{document.id}/document_review_subjects",\
        headers: credentials(user),\
        params: { document_review_subject: { title: title,
                                             review_issuer_id: review_issuer.id,
                                             reviewer_ids: [reviewer.id],
                                             comment: comment } }
      expect(response).to have_http_status(:success)
      expect(json['title']).to eql(title)
      subject = DocumentReviewSubject.last
      expect(subject.review_issuer).to eql(review_issuer)
      expect(subject.reviewers).to include(reviewer)
      expect(subject).to be_in_progress
      expect(subject.comments.first.text).to eql(comment)
    end
  end
end
