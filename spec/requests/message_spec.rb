require 'rails_helper'

describe "Message", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:recipient) { FactoryBot.create(:user) }
  let(:message) {
    FactoryBot.create(:message,
                      sender: user,
                      message_recipients: [ FactoryBot.build(:message_recipient,
                                                             user_id: recipient.id),
                                            FactoryBot.build(:message_recipient) ])

  }

  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers_for_sender) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    let(:headers_for_recipient) { credentials(recipient).merge("CONTENT_TYPE" => "application/json") }
    context "create" do
      it "should get a status success" do
        post "/api/v1/messages",
          params:
            { message:
              FactoryBot.attributes_for(:message,
                                        sender_id: user.id,
                                        message_recipients: {
                                          id: "",
                                          user_id: recipient.id
                                        })
            }.to_json,
          headers: headers_for_sender
        expect(response).to have_http_status(:success)
        expect(user.sent_messages.count).to eq(1)
        expect(user.sent_messages.last.recipients.count).to eq(1)
        expect(recipient.received_messages.count).to eq(1)
      end
      it "should get a status unprocessable entity" do
        post "/api/v1/messages",
          params:
            { message:
              FactoryBot.attributes_for(:message,
                                        body: "",
                                        sender_id: user.id,
                                        message_recipients: {
                                          id: "",
                                          user_id: recipient.id
                                        })
            }.to_json,
          headers: headers_for_sender
        expect(response).to have_http_status(:unprocessable_entity)
        expect(user.sent_messages.count).to eq(0)
        expect(recipient.received_messages.count).to eq(0)
      end
    end
    context "show" do
      context "should get a status success" do
        it "if sender" do
          get "/api/v1/messages/#{message.id}",
            headers: headers_for_sender
          expect(response).to have_http_status(:success)
          expect(json["message_recipients"].count).to be > 1
        end
        it "if recipient" do
          get "/api/v1/messages/#{message.id}",
            headers: headers_for_recipient
          expect(response).to have_http_status(:success)
          expect(json["message_recipients"].count).to eq 1
          expect(recipient.message_recipients
                          .last
                          .read_at).to be_truthy
          expect(recipient.message_recipients
                          .last
                          .read?).to be_truthy
        end
      end
      it "should get status forbidden if a different user" do
        second_message = FactoryBot.create(:message)
        get "/api/v1/messages/#{second_message.id}",
          headers: headers_for_recipient
          expect(response).to have_http_status(:forbidden)
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
                                      message_recipients: {
                                        id: "",
                                        user_id: recipient.id  
                                      })
          }.to_json,
        headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'show' do
      message = FactoryBot.create(:message)
      get "/api/v1/messages/#{message.id}",
        headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end