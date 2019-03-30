require 'rails_helper'

describe "Session", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  user = FactoryBot.create(:user)

  context "sign in" do
    it 'should get a status "error"' do
      post "/sessions",
        params: { session: { login: [ "z" + user.email,
                                      user.username + "1" ].sample,
                             password: "password1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
      expect(JSON(response.body)["status"]).to eq("error")
    end

    it 'should get a status "success"' do
      post "/sessions",
        params: { session: { login: [ user.email,
                                      user.username ].sample,
                             password: "password1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
      expect(JSON(response.body)["status"]).to eq("success")
    end
  end
end
