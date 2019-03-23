require 'rails_helper'

describe Document, type: :request do
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  let(:json) { JSON(response.body) }

  it '#new' do
    get '/api/v1/documents/new', headers: headers
    expect(response).to have_http_status(:success)
    expect(json['document_fields'].count).to eql(4)
  end

  it '#create' do
    title = Faker::Lorem.sentence
    post '/api/v1/documents', params: { document: { email_title: title } }
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#edit' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    get "/api/v1/documents/#{document.id}/edit"
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#update' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    patch "/api/v1/documents/#{document.id}", params: { document: { email_title: title } }
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#index' do
    convention = FactoryBot.create(:convention)
    Document.build_from_convention(convention).save
    get '/api/v1/documents', headers: headers
    expect(json[0]['document_fields'].length).to eql(4)
  end
end
