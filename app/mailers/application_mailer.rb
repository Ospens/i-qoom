class ApplicationMailer < ActionMailer::Base
  default from: 'i-Qoom <no-reply@i-qoom.com>'
  layout 'mailer'
  before_action :set_logo

  def send_contact_form(contact)
    @contact = contact
    mail to: [ 'yasserchehade@gmx.de',
               'shamardin.k@gmail.com' ],
         subject: t(".title")
  end

  def send_user_confirmation(user)
    @user = user
    mail to: @user.email,
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

  def send_reset_password_instructions(user)
    @user = user
    mail to: @user.email,
         subject: t(".title")
  end

  def new_message(message)
    @message = message
    mail to: @message.recipients.map(&:email),
         subject: t(".title")
  end

  private

  def set_logo
    attachments.inline['logo.png'] =
      File.read('app/assets/images/logo.png')
  end
end
