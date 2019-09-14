require 'rails_helper'

describe DocumentRevision, type: :request do
  context 'update_review_status' do
    it 'anon' do
      doc = FactoryBot.create(:document)
      post "/api/v1/document_revisions/#{doc.revision.id}/update_review_status",
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      doc = FactoryBot.create(:document)
      user = FactoryBot.create(:user)
      post "/api/v1/document_revisions/#{doc.revision.id}/update_review_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'review owner' do
      doc = FactoryBot.create(:document)
      rev = doc.revision
      main = rev.document_main
      expect(main).to be_issued_for_information
      user = FactoryBot.create(:user)
      expect_any_instance_of(DocumentRevision).to receive(:can_update_review_status?).with(user).and_return(true)
      post "/api/v1/document_revisions/#{rev.id}/update_review_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:success)
      expect(main.reload).to be_accepted
    end
  end
end
