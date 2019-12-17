require 'rails_helper'

describe "User", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  let(:user) { FactoryBot.attributes_for(:user) }
  let(:json) { JSON(response.body) }

  context "registration" do
    it 'should get a status "success"' do
      post "/api/v1/users",
        params: { user: user }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
      expect(ActionMailer::Base.deliveries.count).to eq(1)
    end
    it 'should get a status "error"' do
      post "/api/v1/users",
        params: { user: user.slice(:email) }.to_json,
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end
  end

  context "project member registration" do
    let(:project_member) { FactoryBot.create(:project_member_pending) }
    it 'should get a status "success" with project_member_id' do
      post "/api/v1/users",
        params: { user: { project_member_id: project_member.id,
                          password: "password1",
                          password_confirmation: "password1",
                          accept_terms_and_conditions: "1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:success)
      expect(project_member.reload.user).to be_present
      expect(json["member_id"]).to be_present
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end

    it "shouldn't get a status 'success' without project_member_id" do
      post "/api/v1/users",
        params: { user: { password: "password1",
                          password_confirmation: "password1",
                          accept_terms_and_conditions: "1" } }.to_json,
        headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      expect(User.count).to eq 0
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end
  end

  context "confirm registration" do
    it "should confirm a user" do
      user = FactoryBot.create(:user, confirmed_at: nil)
      get "/api/v1/users/confirm?token=#{user.confirmation_token}",
        headers: headers
      expect(response).to have_http_status(302)
      expect(User.find_by(id: user.id).confirmed?).to be_truthy
    end
    it "shouldn't confirm a user with wrong data" do
      user = FactoryBot.create(:user, confirmed_at: nil)
      token = ::JsonWebToken.encode(user_id: rand(999),
                                    email: user.email)
      get "/api/v1/users/confirm?token=#{token}",
        headers: headers
      expect(response).to have_http_status(302)
      expect(User.find_by(id: user.id).confirmed?).to be_falsy
    end
  end

  context "send_reset_password_instructions" do
    it "should send a token by email" do
      user = FactoryBot.create(:user)
      post "/api/v1/users/send_reset_password_instructions",
        params: { email: user.email }.to_json,
        headers: headers
      expect(response).to have_http_status(200)
      expect(ActionMailer::Base.deliveries.last.to).to include(user.email)
    end
    it "shouldn't found a user" do
      user = FactoryBot.create(:user)
      post "/api/v1/users/send_reset_password_instructions",
        params: { email: "wrong email" }.to_json,
        headers: headers
      expect(response).to have_http_status(404)
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end
  end
  context "reset_password" do
    it "should get and render reset password token" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      get "/api/v1/users/reset_password?token=#{user.reset_password_token}",
        headers: headers
      expect(response).to have_http_status(200)
    end
    it "shouldn't get and render reset password token" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      get "/api/v1/users/reset_password",
        headers: headers
      expect(response).to have_http_status(404)
    end
  end
  context "update_password" do
    it "should update password" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      patch "/api/v1/users/update_password",
        params: { token: user.reset_password_token,
                  user: {
                    password: "newpassword",
                    password_confirmation: "newpassword" } }.to_json,
        headers: headers
      expect(response).to have_http_status(200)
    end
    it "shouldn't update password with wrong token" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      patch "/api/v1/users/update_password",
        params: { token: "fsdfdsfsdfdsfsd",
                  user: {
                    password: "newpassword",
                    password_confirmation: "newpassword" } }.to_json,
        headers: headers
      expect(response).to have_http_status(422)      
    end
    it "shouldn't update password if expired" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      user.update(reset_password_sent_at: Time.now - 2.hour)
      patch "/api/v1/users/update_password",
        params: { token: user.reset_password_token,
                  user: {
                    password: "newpassword",
                    password_confirmation: "newpassword" } }.to_json,
        headers: headers
      expect(response).to have_http_status(422)      
    end
    it "shouldn't update password with wrong password_confirmation" do
      user = FactoryBot.create(:user)
      user.generate_reset_password_token
      patch "/api/v1/users/update_password",
        params: { token: user.reset_password_token,
                  user: {
                    password: "newpassword",
                    password_confirmation: "wrongwrongwrong" } }.to_json,
        headers: headers
      expect(response).to have_http_status(422)      
    end
  end
end
