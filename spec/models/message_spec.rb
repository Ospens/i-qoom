require 'rails_helper'

RSpec.describe Message, type: :model do
  it { is_expected.to define_enum_for(:status)
          .with_values([ :sent,
                         :deleted ]) }

  it { is_expected.to validate_length_of(:subject)
                        .is_at_least(2)
                        .is_at_most(255) }
  it { is_expected.to validate_presence_of(:subject) }
  it { is_expected.to validate_presence_of(:body) }
  it { is_expected.to belong_to(:sender)
                        .class_name("User") }

  it { is_expected.to have_many(:message_recipients)
                        .dependent(:destroy) }

  it { is_expected.to have_many(:recipients)
                        .through(:message_recipients)
                        .source(:user) }

  it { is_expected.to accept_nested_attributes_for(:message_recipients) }

  context "set_sent_at" do
    subject { FactoryBot.create(:message) }
    it { expect(subject.sent_at).to be_present }
  end

  context "mark_as_read!" do
    let (:message) {
      FactoryBot.create(:message,
                        message_recipients: [ FactoryBot.build(:message_recipient),
                                              FactoryBot.build(:message_recipient) ])

    }
    let (:recipient) {
      message.recipients.first
    }

    it "should work" do
      message.mark_as_read!(recipient.id)
      expect(message.message_recipients
                    .find_by(user_id: recipient.id)
                    .read?).to be_truthy
    end

    context "shouldn't work" do
      it "with sender id" do
        message.mark_as_read!(message.sender.id)
        expect(message.message_recipients
                      .find_by(user_id: recipient.id)
                      .read?).to be_falsy
      end
      it "without id" do
        message.mark_as_read!(nil)
        expect(message.message_recipients
                      .find_by(user_id: recipient.id)
                      .read?).to be_falsy
      end
      it "with wrong id" do
        message.mark_as_read!(698698667)
        expect(message.message_recipients
                      .find_by(user_id: recipient.id)
                      .read?).to be_falsy
      end
      it "with different recipient id" do
        message.mark_as_read!(message.recipients.last.id)
        expect(message.message_recipients
                      .find_by(user_id: recipient.id)
                      .read?).to be_falsy
      end
    end
  end

end
