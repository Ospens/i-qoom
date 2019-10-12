require 'rails_helper'

describe DocumentReviewOwner, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:user) { FactoryBot.create(:user) }

  context '#update' do
    def create_member
      member = project.members.new(user_id: user.id, dms_module_master: true)
      member.save!(validate: false)
    end

    it 'anon' do
      patch '/api/v1/document_review_owner',
        params: { document_review_owner: {
          user_id: user.id, project_id: project.id, originating_company: 'AAA'
        } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch '/api/v1/document_review_owner',
        headers: credentials(user),
        params: { document_review_owner: {
          user_id: user.id, project_id: project.id, originating_company: 'AAA'
        } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'project.user' do
      patch '/api/v1/document_review_owner',
        headers: credentials(project.user),
        params: { document_review_owner: {
          user_id: user.id, project_id: project.id, originating_company: 'AAA'
        } }
      expect(response).to have_http_status(:success)
    end

    it 'creates new' do
      create_member
      expect(DocumentReviewOwner.count).to eql(0)
      patch '/api/v1/document_review_owner',
        headers: credentials(user),
        params: { document_review_owner: {
          user_id: user.id, project_id: project.id, originating_company: 'AAA'
        } }
      expect(response).to have_http_status(:success)
      expect(DocumentReviewOwner.count).to eql(1)
      expect(json['originating_company']).to eql('AAA')
    end

    it 'updates existent' do
      create_member
      review_owner =
        DocumentReviewOwner.create(user_id: user.id,
                                   project_id: project.id,
                                   originating_company: 'AAA')
      expect(DocumentReviewOwner.count).to eql(1)
      patch '/api/v1/document_review_owner',
        headers: credentials(user),
        params: { document_review_owner: {
          user_id: user.id, project_id: project.id, originating_company: 'BBB'
        } }
      expect(response).to have_http_status(:success)
      expect(DocumentReviewOwner.count).to eql(1)
      expect(review_owner.reload.originating_company).to eql('BBB')
    end
  end

  context '#index' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_review_owners"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_review_owners",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'not master' do
      member = project.members.new(user_id: user.id, dms_module_access: true)
      member.save!(validate: false)
      get "/api/v1/projects/#{project.id}/document_review_owners",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'project user' do
      project.user.document_review_owners.create(project: project,
                                                 originating_company: 'AAA')
      get "/api/v1/projects/#{project.id}/document_review_owners",
        headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      expect(json.length).to eql(1)
      expect(json[0]['document_review_owner']).to be_present
      expect(json[0]['document_review_owner']['originating_company']).to eql('AAA')
    end
  end
end
