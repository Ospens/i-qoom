require 'rails_helper'

describe Convention, type: :request do
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  let(:json) { JSON(response.body) }

  it '#new' do
    project = FactoryBot.create(:project)
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
          field.document_field_values.new(value: Faker::Name.initials(3),
                                          position: 1,
                                          title: '')
      end
      convention.save!
      convention
    end

    it '#edit' do
      get "/api/v1/projects/#{project.id}/conventions/edit", headers: credentials(project.user)
      expect(response).to have_http_status(:success)
      expect(json['document_fields'].count).to eql(8)
      field = json['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      expect(field['document_field_values'].length).to eql(1)
    end

    it '#update' do
      title = Faker::Lorem.sentence
      attrs = convention.attributes_for_edit
      convention_field =
        attrs['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      field_value = convention_field['document_field_values'].first
      expect(field_value['value']).to_not eql(title)
      field_value['value'] = title
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
  end
end
