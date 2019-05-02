class ApplicationMailer < ActionMailer::Base
  default from: 'I-Qoom <no-reply@i-qoom.com>'
  layout 'mailer'

  def send_contact_form(contact)
    @contact = contact
    mail to: 'yasserchehade@gmx.de',
        subject: "New message by contact form from I-Qoom"
  end

  def send_project_admin_confirmation(project_admin)
    @project_admin = project_admin
    mail to: @project_admin.email,
         subject: "You've been added to a new project"
  end
end
