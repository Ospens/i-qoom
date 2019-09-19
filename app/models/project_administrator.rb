class ProjectAdministrator < ApplicationRecord

  enum status: [ :unconfirmed,
                 :awaiting_confirmation,
                 :active ]

  belongs_to :project,
    inverse_of: :admins, autosave: true, validate: false

  belongs_to :user, required: false

  belongs_to :inviter,
             class_name: "User",
             required: false

  validates :email,
            email: true,
            presence: true,
            uniqueness: { scope: :project_id }

  before_create :add_user

  after_create :invite_to_the_project,
    if: -> { unconfirmed? && first_confirmation_sent_at.nil? }

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

  # adds a user only when it is being created,
  # then a user can be changed only by confirmation
  def add_user
    self.user = User.find_by(email: email) if user.nil?
  end

  def invite_to_the_project
    self.inviter_id = project.user.id if inviter_id.nil?
    self.inviter_id = project.admins_inviter_id if project.admins_inviter_id.present?
    self.send_confirmation_email
  end

end
