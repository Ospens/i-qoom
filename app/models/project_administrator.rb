class ProjectAdministrator < ApplicationRecord

  enum status: [ :unconfirmed,
                 :awaiting_confirmation,
                 :active ]

  belongs_to :project,
    inverse_of: :admins

  belongs_to :user, required: false

  validates :email,
            email: true,
            presence: true

  before_create :add_user

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

  def confirmation_token
    ::JsonWebToken.encode(admin_id: id, email: email)
  end

  def remove
    if project.admins.count > 1
      destroy
      true
    else
      errors.add(:project, :last_admin)
      false
    end
  end

  private

  # adds a user only when admin is being created,
  # then a user can be changed only by confirmation

  def add_user
    self.user = User.find_by(email: email) if user.nil?
  end

end
