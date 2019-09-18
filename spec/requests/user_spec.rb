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

  context "confirm registration" do
    it "should confirm a user" do
      user = FactoryBot.create(:user, confirmed_at: nil)
      get "/api/v1/users/confirm?token=#{user.confirmation_token}",
        headers: headers
      expect(response).to have_http_status(:ok)
      expect(User.find_by(id: user.id).confirmed?).to be_truthy
    end
    it "shouldn't confirm a user with wrong data" do
      user = FactoryBot.create(:user, confirmed_at: nil)
      token = ::JsonWebToken.encode(user_id: rand(999),
                                    email: user.email)
      get "/api/v1/users/confirm?token=#{token}",
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      expect(User.find_by(id: user.id).confirmed?).to be_falsy
    end
  end
end
