class ProjectMemberConfirmation
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :token, :signed_in_user, :project_member

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end

    @data = ::JsonWebToken.decode(token) || {}
    self.project_member =
      ProjectMember.find_by(id: @data["member_id"])
  end

  def accept
    if valid?
      @project_member.creation_step_active!
    else
      false
    end
  end

  def registration_required?
    errors.count == 1 &&
      !emails_matching? &&
      project_member.try(:user).nil?
  end

  validates_presence_of :token

  validate :token_validity,
           :project_member_exists,
           :emails_match,
           :pending_status,
           :already_confirmed

  def persisted?
    false
  end

  def emails_matching?
    project_member.try(:email) == signed_in_user.try(:email)
  end

  private

  def token_validity
    errors.add(:token, :invalid) unless ::JsonWebToken.decode(token).present?
  end

  def project_member_exists
    errors.add(:token, :project_member_is_not_found) unless @project_member.present?
  end

  def emails_match
    unless emails_matching?
      errors.add(:token, :emails_do_not_match)
    end
  end

  def pending_status
    unless @project_member.try(:creation_step_pending?) ||
           @project_member.try(:creation_step_active?)
      errors.add(:token, :project_member_cant_be_confirmed)
    end
  end

  def already_confirmed
    if @project_member.try(:creation_step_active?)
      errors.add(:token, :project_member_has_already_been_confirmed)
    end
  end
end