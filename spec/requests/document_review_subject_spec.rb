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

  context '#index' do
    it 'anon' do
      get "/api/v1/document_revisions/#{revision.id}/document_review_subjects"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      FactoryBot.create(:document_review_subject, document_revision: revision)
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/document_revisions/#{revision.id}/document_review_subjects",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      subject = json.first
      expect(subject).to have_key('id')
      expect(subject).to have_key('document_reference')
      expect(subject).to have_key('title')
      expect(subject).to have_key('status')
      expect(subject).to have_key('comment')
      expect(subject).to have_key('review_issuer_id')
      expect(subject).to have_key('reviewer_ids')
      expect(subject).to_not have_key('created_at')
      expect(subject).to_not have_key('updated_at')
    end
  end

  context '#show' do
    let(:review_subject) { FactoryBot.create(:document_review_subject, document_revision: revision) }
    let!(:comment) { FactoryBot.create(:document_review_comment, document_review_subject: review_subject) }

    it 'anon' do
      get "/api/v1/document_review_subjects/#{review_subject.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user without rights' do
      get "/api/v1/document_review_subjects/#{review_subject.id}", headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/document_review_subjects/#{review_subject.id}", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('comments')
      expect(json).to have_key('review_issuer')
      expect(json).to have_key('reviewers')
      expect(json['comments'].first).to have_key('user')
    end
  end

  context '#update_status' do
    let(:review_subject) { FactoryBot.create(:document_review_subject, document_revision: revision) }

    it 'anon' do
      post "/api/v1/document_review_subjects/#{review_subject.id}/update_status",
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      user = FactoryBot.create(:user)
      post "/api/v1/document_review_subjects/#{review_subject.id}/update_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'review owner' do
      review_subject.update!(status: :in_progress)
      expect_any_instance_of(DocumentRevision).to receive(:can_update_review_status?).with(user).and_return(true)
      post "/api/v1/document_review_subjects/#{review_subject.id}/update_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:success)
      expect(review_subject.reload).to be_accepted
    end
  end
end
