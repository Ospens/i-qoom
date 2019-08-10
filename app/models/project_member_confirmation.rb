class ProjectMemberConfirmation
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :token, :signed_in_user

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end

    @data = ::JsonWebToken.decode(token) || {}
    @project_member =
      ProjectMember.find_by(id: @data["member_id"])
  end

  def save
    if valid?
      if @project_member.update(user: signed_in_user)
        @project_member.creation_step_active!
      end
    else
      false
    end
  end

  validates_presence_of :token,
                        :signed_in_user

  validate :token_validity,
           :project_member_exists,
           :emails_match,
           :pending_status,
           :already_confirmed

  def persisted?
    false
  end

  private

  def token_validity
    errors.add(:token, :invalid) unless ::JsonWebToken.decode(token).present?
  end

  def project_member_exists
    errors.add(:token, :project_member_is_not_found) unless @project_member.present?
  end

  def emails_match
    unless @data["email"] == signed_in_user.try(:email)
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