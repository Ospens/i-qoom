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
      get "/api/v1/document_revisions/#{revision.id}/document_review_subjects/new"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/document_revisions/#{revision.id}/document_review_subjects/new", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to eql({})
    end
  end

  context '#create' do
    it 'anon' do
      post "/api/v1/document_revisions/#{revision.id}/document_review_subjects"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      post "/api/v1/document_revisions/#{revision.id}/document_review_subjects", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to eql({})
    end
  end
end
