require 'rails_helper'

describe "User", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  user = FactoryBot.attributes_for(:user)

  context "registration" do
    it 'should get a status "error"' do
      post "/api/v1/users",
        params: { user: user.slice(:email) }.to_json,
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON(response.body)["status"]).to eq("error")
    end

    it 'should get a status "success"' do
      post "/api/v1/users",
        params: { user: user }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
      expect(JSON(response.body)["status"]).to eq("success")
    end
  end
end
