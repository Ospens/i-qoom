class ApplicationMailer < ActionMailer::Base
  default from: 'I-Qoom <no-reply@i-qoom.com>'
  layout 'mailer'

  def send_contact_form(contact)
    @contact = contact
    mail to: 'yasserchehade@gmx.de',
        subject: t(".title")
  end

  def send_project_admin_confirmation(project_admin)
    @project_admin = project_admin
    mail to: @project_admin.email,
         subject: t(".title")
  end
end
