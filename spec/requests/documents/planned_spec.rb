require 'rails_helper'
include DocumentConcern

describe Document, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project) }
  let!(:convention) do
    convention = project.conventions.active
    convention.document_fields.limit_by_value.each do |field|
      field.document_rights
           .create(parent: user,
                   limit_for: :value,
                   document_field_value: field.document_field_values.first,
                   enabled: true)
    end
    convention
  end

  context '#create_planned' do
    let(:title) { Faker::Lorem.sentence }

    before do
      @params = document_attributes(user, false)
      project = get_project_from_document_attrs(@params)
      @params = { documents: [ @params ] }
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
      end

      it 'update document' do
        doc = FactoryBot.create(:document)
        doc_attrs = doc.attributes_for_edit
        doc_attrs['id'] = doc.id
        doc_attrs['email_title'] = title
        doc.project.members.create!(user: user,
                                    dms_module_master: true,
                                    employment_type: :employee)
        post "/api/v1/projects/#{doc.project.id}/documents/planned",\
          params: { documents: [doc_attrs] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(doc.revision.last_version.email_title).to eql(title)
      end
    end
  end
end
