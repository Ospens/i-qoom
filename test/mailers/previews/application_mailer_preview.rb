class ApplicationMailerPreview < ActionMailer::Preview

  def send_user_confirmation
    ApplicationMailer.send_user_confirmation(FactoryBot.build(:user))
  end

  def send_project_admin_confirmation
    ApplicationMailer.send_project_admin_confirmation(FactoryBot.build(:project_administrator,
                                                                       inviter: FactoryBot.build(:user)))
  end

  def send_project_member_confirmation
    ApplicationMailer.send_project_member_confirmation(FactoryBot.build(:project_member,
                                                                        inviter: FactoryBot.build(:user)))
  end

  def send_reset_password_instructions
    ApplicationMailer.send_reset_password_instructions(FactoryBot.build(:user))
  end
end