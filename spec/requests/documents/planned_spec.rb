require 'rails_helper'
include DocumentConcern

describe Document, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }

  context '#index' do
    let(:title) { Faker::Lorem.sentence }
    let(:document) do
      attrs = document_attributes(user)
      Document.create(attrs)
    end
    let(:project) { document.project }

    before do
      document.document_main.update(planned: true, position: 3)
    end

    it 'anon' do
      get "/api/v1/projects/#{project.id}/documents/planned"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/documents/planned",\
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      get "/api/v1/projects/#{project.id}/documents/planned",\
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/documents/planned",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['document_mains'].length).to eql(1)
      expect(json['new']['document_fields'].length).to eql(8)
      main = json['document_mains'].first
      expect(main['edit']['document_fields'].length).to eql(8)
      expect(main['document']['document_fields'].length).to eql(8)
      expect(main['position']).to eql(3)
    end
  end

  context '#destroy' do
    let(:document) do
      attrs = document_attributes(user)
      Document.create(attrs)
    end
    let(:project) { document.project }
    let(:main) { document.document_main }

    before do
      document.document_main.update(planned: true, position: 3)
    end

    it 'anon' do
      delete "/api/v1/projects/#{project.id}/documents/planned/#{main.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      delete "/api/v1/projects/#{project.id}/documents/planned/#{main.id}",
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      delete "/api/v1/projects/#{project.id}/documents/planned/#{main.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      delete "/api/v1/projects/#{project.id}/documents/planned/#{main.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(DocumentMain.count).to eql(0)
    end

    it 'not planned' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      main.update(planned: false)
      delete "/api/v1/projects/#{project.id}/documents/planned/#{main.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
      expect(DocumentMain.count).to eql(1)
    end
  end
end
