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
    let(:convention) { FactoryBot.create(:convention) }
    let(:project) { convention.project }

    it '#edit' do
      get "/api/v1/projects/#{convention.project.id}/conventions/edit", headers: credentials(convention.project.user)
      expect(response).to have_http_status(:success)
      expect(json['id']).to eql(convention.id)
      expect(json['document_fields'].count).to eql(8)
      field = json['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
      expect(field['document_field_values'].length).to eql(1)
    end

    it '#update' do
      convention_field =
        convention.document_fields.find_by(codification_kind: DocumentField.codification_kinds[:originating_company])
      title = Faker::Lorem.sentence
      expect(convention_field.title).to_not eql(title)
      patch "/api/v1/projects/#{convention.project.id}/conventions",\
        params: { convention: { document_fields_attributes: { id: convention_field.id, title: title } } },\
        headers: credentials(project.user)
      expect(convention.document_fields.count).to eql(8)
      expect(convention_field.reload.title).to eql(title)
      patch "/api/v1/projects/#{convention.project.id}/conventions",\
        params: { convention: { document_fields_attributes: { id: convention_field.id, column: 3 } } },\
        headers: credentials(project.user)
      expect(json['document_fields[0].column']).to eql(['is not included in the list'])
    end
  end
end
