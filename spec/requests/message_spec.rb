require 'rails_helper'

describe "Message", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:recipient) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(user_id: user.id) }
  let(:project_member) { FactoryBot.create(:project_member,
                                           project_id: project.id,
                                           email: recipient.email) }
  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    context "create" do
      it "should get success status" do
        post "/api/v1/messages",
          params:
            { message:
              FactoryBot.attributes_for(:message,
                                        sender_id: user.id,
                                        recipient_id: recipient.id)
            }.to_json,
          headers: headers
        expect(response).to have_http_status(:success)        
      end
      it "should get unprocessable entity status" do
        post "/api/v1/messages",
          params:
            { message:
              FactoryBot.attributes_for(:message,
                                        body: "",
                                        sender_id: user.id,
                                        recipient_id: recipient.id)
            }.to_json,
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)        
      end
    end
  end

  context 'not logged in and should get a status "forbidden" on' do
    let(:headers) { { "CONTENT_TYPE" => "application/json" } }
    it 'create' do
      post "/api/v1/messages",
        params:
          { message:
            FactoryBot.attributes_for(:message,
                                      sender_id: user.id,
                                      recipient_id: recipient.id)
          }.to_json,
        headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end