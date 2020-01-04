require 'rails_helper'

describe ApplicationMailer, type: :mailer do
  context 'new document' do
    let(:email) { Faker::Internet.email }
    let(:email_title) { Faker::Lorem.sentence }
    let(:email_text) { Faker::Lorem.characters(number: 50) }
    let(:document) do
      doc = FactoryBot.create(:document)
      doc.update!(email_title: email_title, email_text: email_text)
      doc
    end
    let(:mail) { ApplicationMailer.new_document(document, email) }
    let(:body) { mail.html_part.body.decoded }
    let(:download) { document.document_native_file_downloads.last }

    it { expect(mail.subject).to eql(email_title) }
    it { expect(mail.to).to eql([email]) }
    it { expect(mail.from).to eql(['no-reply@i-qoom.com']) }
    it { expect(body).to have_text(email_text) }
    it { body; expect(document.document_native_file_downloads.count).to eql(1) }
    it { expect(body).to have_text(download.slug) }
    it 'check if password is right' do
      expect(SecureRandom).to receive(:hex).and_call_original
      expect(SecureRandom).to receive(:hex).with(5).and_return('123456')
      expect(body).to have_text('123456')
      expect(download.authenticate('123456')).to eql(download)
    end
  end
end
