require 'rails_helper'

RSpec.describe DocumentEmailGroup, type: :model do
  it 'send_emails' do
    doc = FactoryBot.create(:document)
    user = FactoryBot.create(:user)
    email = Faker::Internet.email
    doc.save_emails(user, [email])
    group = doc.document_email_groups.last
    dbl = double
    expect(ApplicationMailer).to receive(:new_document).with(doc, email).and_return(dbl)
    expect(dbl).to receive(:deliver_later)
    group.send_emails
  end
end
