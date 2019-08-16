class ProjectAdministratorConfirmation
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :token, :signed_in_user

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end

    @data = ::JsonWebToken.decode(token) || {}
    @project_admin =
      ProjectAdministrator.find_by(id: @data["admin_id"])
  end

  def save
    if valid?
      if @project_admin.update(user: signed_in_user)
        @project_admin.active!
      end
    else
      false
    end
  end

  validates_presence_of :token,
                        :signed_in_user

  validate :token_validity,
           :project_admin_exists,
           :emails_match,
           :already_confirmed

  def persisted?
    false
  end

  private

  def token_validity
    errors.add(:token, :invalid) unless ::JsonWebToken.decode(token).present?
  end

  def project_admin_exists
    errors.add(:token, :project_admin_is_not_found) unless @project_admin.present?
  end

  def emails_match
    unless @data["email"] == signed_in_user.try(:email)
      errors.add(:token, :emails_do_not_match)
    end
  end

  def already_confirmed
    if @project_admin.try(:active?)
      errors.add(:token, :project_admin_has_already_been_confirmed)
    end
  end

end