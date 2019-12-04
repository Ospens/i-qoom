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

  context '#create' do
    let(:title) { Faker::Lorem.sentence }

    before do
      @params = document_attributes(user, false)
      project = get_project_from_document_attrs(@params)
      @params = { document_mains: [{ id: '', position: 2, document: @params }] }
      @project_id = project.id
    end

    it 'anon' do
      post "/api/v1/projects/#{@project_id}/documents/planned", params: @params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{@project_id}/documents/planned",\
        params: @params, headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      post "/api/v1/projects/#{@project_id}/documents/planned",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    context 'dms master' do
      it 'create document' do
        Project.find(@project_id).members.create!(user: user,
                                                  dms_module_master: true,
                                                  employment_type: :employee)
        post "/api/v1/projects/#{@project_id}/documents/planned",\
          params: @params, headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(DocumentMain.last).to be_planned
        expect(DocumentMain.last.position).to eql(2)
      end

      it 'update document' do
        doc = FactoryBot.create(:document)
        doc_attrs = doc.attributes_for_edit
        doc_attrs['id'] = doc.id
        doc_attrs['email_title'] = title
        doc.project.members.create!(user: user,
                                    dms_module_master: true,
                                    employment_type: :employee)
        post "/api/v1/projects/#{doc.project.id}/documents/planned",
          params: { document_mains: [ { id: doc.document_main.id,
                                        document: doc_attrs } ] },
          headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(doc.revision.last_version.email_title).to eql(title)
      end
    end
  end
end
