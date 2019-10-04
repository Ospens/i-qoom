require 'rails_helper'

describe DocumentReviewTag, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:user) { FactoryBot.create(:user) }

  context '#create' do
    let(:tag) { DocumentReviewTag.first }

    it 'anon' do
      post "/api/v1/projects/#{project.id}/document_review_tags",
        params: { document_review_tag: { name: '111' } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{project.id}/document_review_tags",
        headers: credentials(user),
        params: { document_review_tag: { name: '111' } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{project.id}/document_review_tags",
        headers: credentials(user),
        params: { document_review_tag: { name: '111', position: 2 } }
      expect(response).to have_http_status(:success)
      expect(DocumentReviewTag.count).to eql(1)
      expect(tag.name).to eql('111')
      expect(tag.position).to eql(2)
    end
  end

  context '#update' do
    let(:tag) { FactoryBot.create(:document_review_tag, project: project) }
    let(:name) { Faker::Lorem.word }

    it 'anon' do
      patch "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}",
        params: { document_review_tag: { name: name } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}",
        headers: credentials(user),
        params: { document_review_tag: { name: name } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      patch "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}",
        headers: credentials(user),
        params: { document_review_tag: { name: name } }
      expect(response).to have_http_status(:success)
      expect(tag.reload.name).to eql(name)
    end
  end

  context '#destroy' do
    let(:tag) { FactoryBot.create(:document_review_tag, project: project) }

    it 'anon' do
      delete "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      delete "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      delete "/api/v1/projects/#{project.id}/document_review_tags/#{tag.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(DocumentReviewTag.count).to eql(0)
    end
  end

  context '#destroy' do
    let!(:tag) { FactoryBot.create(:document_review_tag, project: project) }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_review_tags"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_review_tags",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/document_review_tags",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json.length).to eql(1)
    end
  end
end
