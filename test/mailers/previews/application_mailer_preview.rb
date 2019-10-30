class ApplicationMailerPreview < ActionMailer::Preview

  def user_confirmation
    ApplicationMailer.user_confirmation(FactoryBot.build(:user))
  end

  def project_admin_confirmation
    ApplicationMailer.project_admin_confirmation(FactoryBot.build(:project_administrator,
                                                                       inviter: FactoryBot.build(:user)))
  end

  def project_member_confirmation
    ApplicationMailer.project_member_confirmation(FactoryBot.build(:project_member,
                                                                        inviter: FactoryBot.build(:user)))
  end

  def reset_password_instructions
    ApplicationMailer.reset_password_instructions(FactoryBot.build(:user))
  end

  def new_message
    ApplicationMailer.new_message(FactoryBot.build(:message))
  end
end