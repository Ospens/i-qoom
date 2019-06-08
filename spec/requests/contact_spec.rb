require 'rails_helper'

describe "Contact", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  let(:json) { JSON(response.body) }

  it 'should get a status "error"' do
    post "/api/v1/contacts",
      params: { contact: { email: Faker::Internet.email } }.to_json,
      headers: headers
    expect(response).to have_http_status(:unprocessable_entity)
    expect(json["status"]).to eq("error")
  end

  it 'should get a status "success"' do
    post "/api/v1/contacts",
      params: { contact: { email: Faker::Internet.email,
                           phone_number: Faker::PhoneNumber.phone_number,
                           text: Faker::Lorem.paragraphs.join(" ") } }.to_json,
      headers: headers
    expect(response).to have_http_status(:success)
    expect(json["status"]).to eq("success")
  end
end
