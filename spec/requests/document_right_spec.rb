require 'rails_helper'

describe DocumentRight, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:convention) { project.conventions.active }
  let(:user) { FactoryBot.create(:user) }

  before do
    originating_company =
      convention.document_fields.find_by(codification_kind: :originating_company)
    originating_company.document_rights
                       .create(user: user,
                               limit_for: :value,
                               document_field_value:
                                originating_company.document_field_values.first,
                               enabled: true)
  end

  context '#edit' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_rights/edit"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_rights/edit", headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'project user' do
      get "/api/v1/projects/#{project.id}/document_rights/edit", headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      expect(json['users'][0]['id']).to eql(user.id)
      expect(json['users'][0]['document_rights'].length).to eql(3)
    end
  end

  context '#update' do
    before do
      @attrs = DocumentRight.attributes_for_edit(project)
      @attrs[:users].first[:document_rights].each do |right|
        right['enabled'] = true
      end
    end

    it 'anon' do
      patch "/api/v1/projects/#{project.id}/document_rights", params: @attrs
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch "/api/v1/projects/#{project.id}/document_rights", params: @attrs, headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'project user' do
      expect(Document.new(project: project).can_create?(user)).to eql(false)
      patch "/api/v1/projects/#{project.id}/document_rights", params: @attrs, headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      expect(Document.new(project: project).can_create?(user)).to eql(true)
    end
  end
end
