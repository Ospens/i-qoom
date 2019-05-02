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
      ApplicationMailer.send_project_admin_confirmation(self).deliver_now
    end
  end

end
