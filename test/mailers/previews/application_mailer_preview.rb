class ApplicationMailerPreview < ActionMailer::Preview

  def send_user_confirmation
    ApplicationMailer.send_user_confirmation(FactoryBot.build(:user))
  end

  def send_project_admin_confirmation
    ApplicationMailer.send_project_admin_confirmation(FactoryBot.build(:project_administrator))
  end

  def send_project_member_confirmation
    ApplicationMailer.send_project_member_confirmation(FactoryBot.build(:project_member))
  end
end