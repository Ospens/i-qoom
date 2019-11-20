class Session
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActiveModel::Serialization

  @@accessible_columns = [:login, :password, :user, :auth_token]

  attr_accessor *@@accessible_columns

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
    self.user =
      User.find_by(email: login.try(:downcase)) || User.find_by(member_id: login)
    if signed_up_successfully?
      self.auth_token = ::JsonWebToken.encode(user_id: user.id)
    end
  end

  validate :login_is_valid
  validate :password_is_valid
  validate :not_confirmed

  def persisted?
    false
  end

  private

  def signed_up_successfully?
    user.present? && user.valid_password?(password)
  end

  def login_is_valid
    errors.add(:login, :invalid) unless user.present?
  end

  def password_is_valid
    if user.present? && !user.valid_password?(password)
      errors.add(:password, :invalid)
    end
  end

  def not_confirmed
    errors.add(:user, :not_confirmed) if user.present? && !user.confirmed?
  end

end