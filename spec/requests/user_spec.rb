require 'rails_helper'

describe "User", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  let(:user) { FactoryBot.attributes_for(:user) }
  let(:json) { JSON(response.body) }

  context "registration" do
    it 'should get a status "error"' do
      post "/api/v1/users",
        params: { user: user.slice(:email) }.to_json,
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'should get a status "success"' do
      post "/api/v1/users",
        params: { user: user }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
    end
  end
end
