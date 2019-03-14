class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :password_confirmation,
    on: [:create, :password_changed?]

  def self.sign_in(login, password)
    user = User.find_by(email: login)
    if user.present?
      if user.valid_password?(password)
        true
      else
        errors.add(:password, :invalid)
      end
    else
      errors.add(:login, :invalid)
    end
  end

end
