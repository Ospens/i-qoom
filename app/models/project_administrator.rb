class ProjectAdministrator < ApplicationRecord

  enum status: [ :unconfirmed,
                 :awaiting_confirmation,
                 :active ]

  belongs_to :project

  belongs_to :user, required: false

  validates :email,
            email: true,
            presence: true

  def send_confirmation_email
    if awaiting_confirmation!
      if first_confirmation_sent_at.nil?
        self.first_confirmation_sent_at = Time.now
      else
        self.confirmation_resent_at = Time.now
      end
      ApplicationMailer.send_project_admin_confirmation(self).deliver_now
      self.save
    end
  end

end
