require 'rails_helper'

describe Document, type: :request do
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project) }

  def credentials(user)
    session = Session.new(login: user.email, password: user.password)
    { 'Authorization' => session.auth_token }
  end

  it '#new' do
    FactoryBot.create(:convention, project: project)
    get "/api/v1/projects/#{project.id}/documents/new", headers: credentials(user)
    expect(response).to have_http_status(:success)
    expect(json['document_fields_attributes'].count).to eql(6)
  end

  it '#create' do
    title = Faker::Lorem.sentence
    post "/api/v1/projects/#{project.id}/documents", params: { document: { email_title: title } }, headers: credentials(user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#edit' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    get "/api/v1/documents/#{document.id}/edit", headers: credentials(document.user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#update' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    patch "/api/v1/documents/#{document.id}", params: { document: { email_title: title } }, headers: credentials(document.user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#index' do
    convention = FactoryBot.create(:convention, project: project)
    convention.document_fields.each do |field|
      if field.can_limit_by_value?
        field.document_rights.create(user: user, document_field_value: field.document_field_values.first, limit_for: :value)
      else
        field.document_rights.create(user: user, limit_for: :field)
      end
    end
    project.documents.create(Document.build_from_convention(convention, user).merge(user: user))
    get "/api/v1/projects/#{project.id}/documents", headers: credentials(user)
    expect(json[0]['document_fields'].length).to eql(7)
  end
end
