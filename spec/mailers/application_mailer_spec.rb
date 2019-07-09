require 'rails_helper'

describe ApplicationMailer, type: :mailer do
  context 'seller' do
    let(:email) { Faker::Internet.email }
    let(:email_title) { Faker::Lorem.sentence }
    let(:email_text) { Faker::Lorem.characters(50) }
    let(:document) do
      doc = FactoryBot.create(:document)
      doc.update!(email_title: email_title, email_text: email_text)
      doc
    end
    let(:mail) { ApplicationMailer.new_document(document, email) }

    it { expect(mail.subject).to eql(email_title) }
    it { expect(mail.to).to eql([email]) }
    it { expect(mail.from).to eql(['no-reply@i-qoom.com']) }
    it { expect(mail.body.decoded).to have_text('Link to document is pending') }
    it { expect(mail.body.decoded).to have_text(email_text) }
  end
end
