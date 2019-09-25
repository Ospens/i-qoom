require 'rails_helper'

describe Convention, type: :request do
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  let(:json) { JSON(response.body) }

  it '#new' do
    project = FactoryBot.create(:project)
    project.members.create!(user: project.user, dms_module_master: true, employment_type: :employee)
    get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(project.user)
    expect(response).to have_http_status(:success)
    expect(json['id']).to be_nil
    expect(json['document_fields'].count).to eql(8)
  end

  context do
    let(:project) { FactoryBot.create(:project) }
    let!(:convention) do
      convention = project.conventions.new(number: 1)
      convention.build_default_fields
      convention.document_fields.each do |field|
        next unless field.select_field?
        value =
          field.document_field_values.new(value: Faker::Name.initials,
                                          position: 1,
                                          title: '')
      end
      convention.save!
      convention
    end

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
        project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
        get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(user)
        expect(response).to have_http_status(:forbidden)
      end

      it 'dms master' do
        master = FactoryBot.create(:user)
        project.members.create!(user: master, dms_module_master: true, employment_type: :employee)
        get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(master)
        expect(response).to have_http_status(:success)
        expect(json['document_fields'].count).to eql(8)
        field = json['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
        expect(field['document_field_values'].length).to eql(1)
      end
    end

    it '#update' do
      title = Faker::Lorem.sentence
      attrs = convention.attributes_for_edit
      convention_field =
        attrs['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      field_value = convention_field['document_field_values'].first
      expect(field_value['value']).to_not eql(title)
      field_value['value'] = title
      project.members.create!(user: project.user, dms_module_master: true, employment_type: :employee)
      patch "/api/v1/projects/#{project.id}/conventions",\
        params: { convention: attrs },\
        headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      new_convention = project.conventions.last
      field = new_convention.document_fields.find_by(codification_kind: :originating_company)
      field_value = field.document_field_values.first
      expect(new_convention.document_fields.count).to eql(9)
      expect(field_value.value).to eql(title)
    end

    it '#get_field_titles' do
      get "/api/v1/projects/#{project.id}/conventions/get_field_titles",
        headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      expect(json['document_fields'].count).to eql(8)
    end

    it '#update_field_titles' do
      title = Faker::Lorem.sentence
      attrs = convention.attributes_for_update_field_titles
      convention_field =
        attrs['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      field_value = convention_field['document_field_values'].first
      expect(field_value['title']).to_not eql(title)
      field_value['title'] = title
      project.members.create!(user: project.user, dms_module_master: true, employment_type: :employee)
      patch "/api/v1/projects/#{project.id}/conventions/update_field_titles",
        params: { convention: attrs },
        headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      field = convention.document_fields.find_by(codification_kind: :originating_company)
      field_value = field.document_field_values.first
      expect(field_value.title).to eql(title)
    end
  end
end
