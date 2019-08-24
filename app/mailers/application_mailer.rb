class ApplicationMailer < ActionMailer::Base
  default from: 'I-Qoom <no-reply@i-qoom.com>'
  layout 'mailer'

  def send_contact_form(contact)
    @contact = contact
    mail to: [ 'yasserchehade@gmx.de',
               'shamardin.k@gmail.com' ],
        subject: t(".title")
  end

  def send_project_admin_confirmation(project_admin)
    @project_admin = project_admin
    mail to: @project_admin.email,
         subject: t(".title")
  end

  def send_project_member_confirmation(project_member)
    @project_member = project_member
    mail to: @project_member.email,
         subject: t(".title")
  end


  def new_document(document, email)
    @document = document
    mail to: email, subject: document.email_title
  end
end
