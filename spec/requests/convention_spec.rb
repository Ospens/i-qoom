require 'rails_helper'

describe Convention, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:convention) { project.conventions.active }

  context '#edit' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/conventions/edit"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      user = FactoryBot.create(:user)
      get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      user = FactoryBot.create(:user)
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      master = FactoryBot.create(:user)
      project.members.create!(user: master,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(master)
      expect(response).to have_http_status(:success)
      expect(json['document_fields'].count).to eql(8)
      field = json['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      expect(field['document_field_values'].length).to eql(1)
    end
  end

  context '#update' do
    let(:attrs) { project.conventions.active.attributes_for_edit }

    it 'anon' do
      patch "/api/v1/projects/#{project.id}/conventions",
        params: { convention: attrs }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      user = FactoryBot.create(:user)
      patch "/api/v1/projects/#{project.id}/conventions",
        params: { convention: attrs },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      user = FactoryBot.create(:user)
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      patch "/api/v1/projects/#{project.id}/conventions",
        params: { convention: attrs },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it '#dms master' do
      value = Faker::Name.initials
      attrs = project.conventions.active.attributes_for_edit
      convention_field =
        attrs['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      field_value = convention_field['document_field_values'].first
      expect(field_value['value']).to_not eql(value)
      field_value['value'] = value
      project.members.create!(user: project.user,
                              dms_module_master: true,
                              employment_type: :employee)
      patch "/api/v1/projects/#{project.id}/conventions",
        params: { convention: attrs },
        headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      new_convention = project.conventions.last
      field = new_convention.document_fields.find_by(codification_kind: :originating_company)
      field_value = field.document_field_values.first
      expect(new_convention.document_fields.count).to eql(9)
      expect(field_value.value).to eql(value)
    end
  end

  context '#download_codification' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/conventions/#{convention.id}/download_codification"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      user = FactoryBot.create(:user)
      get "/api/v1/projects/#{project.id}/conventions/#{convention.id}/download_codification",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      user = FactoryBot.create(:user)
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/conventions/#{convention.id}/download_codification",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
    end

    it 'dms master' do
      master = FactoryBot.create(:user)
      project.members.create!(user: master,
                              dms_module_access: true,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/conventions/#{convention.id}/download_codification",
        headers: credentials(master)
      expect(response).to have_http_status(:success)
      expect(response.header['Content-Disposition']).to include('project_codification.pdf')
    end
  end
end
