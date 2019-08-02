require 'rails_helper'

describe "Session", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  let(:user) { FactoryBot.create(:user) }
  let(:json) { JSON(response.body) }

  context "sign in" do
    it 'should get a status "error"' do
      post "/api/v1/sessions",
        params: { session: { login: [ "z" + user.email,
                                      user.username + "1" ].sample,
                             password: "password1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'should get a status "success"' do
      post "/api/v1/sessions",
        params: { session: { login: [ user.email,
                                      user.username ].sample,
                             password: "password1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
    end
  end
end
