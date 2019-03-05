class ApplicationMailer < ActionMailer::Base
  default from: 'I-Qoom <no-reply@i-qoom.com>'
  layout 'mailer'

  def send_contact_form(contact)
    @contact = contact
    mail to: 'shamardin.k@gmail.com',
        subject: "New message by contact form from I-Qoom"
  end
end
