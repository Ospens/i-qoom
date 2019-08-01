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
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      post "/api/v1/documents/#{document.id}/document_review_subjects",\
        headers: credentials(user),\
        params: { document_review_subject: { title: title } }
      expect(response).to have_http_status(:success)
      expect(json['title']).to eql(title)
    end
  end
end
