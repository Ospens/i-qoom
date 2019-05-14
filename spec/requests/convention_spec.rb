require 'rails_helper'

describe Convention, type: :request do
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  let(:json) { JSON(response.body) }
  let(:convention) { FactoryBot.create(:convention) }

  def credentials(user)
    session = Session.new(login: user.email, password: user.password)
    { 'Authorization' => session.auth_token }
  end

  it '#edit' do
    get "/api/v1/conventions/#{convention.id}/edit", headers: credentials(convention.project.user)
    expect(response).to have_http_status(:success)
    expect(json['id']).to eql(convention.id)
    expect(json['document_fields'].count).to eql(8)
  end

  it '#update' do
    convention_field = convention.document_fields.find_by(codification_kind: DocumentField.codification_kinds[:originating_company])
    title = Faker::Lorem.sentence
    expect(convention_field.title).to_not eql(title)
    patch "/api/v1/conventions/#{convention.id}", params: { convention: { document_fields_attributes: { id: convention_field.id, title: title } } }, headers: credentials(convention.project.user)
    expect(convention.document_fields.count).to eql(8)
    expect(convention_field.reload.title).to eql(title)
    patch "/api/v1/conventions/#{convention.id}", params: { convention: { document_fields_attributes: { id: convention_field.id, column: 3 } } }, headers: credentials(convention.project.user)
    expect(json['document_fields.column']).to eql(['is not included in the list'])
  end
end
