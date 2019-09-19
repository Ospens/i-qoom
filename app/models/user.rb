class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable

  attr_accessor :accept_terms_and_conditions

  has_many :projects
  has_many :project_administrators

  has_many :documents, class_name: 'DocumentMain'
  has_many :document_rights
  accepts_nested_attributes_for :document_rights
  has_many :document_folders

  validates_presence_of :password_confirmation,
    on: [:create, :password_changed?]

  validates :first_name,
            :last_name,
            presence: true,
            length: { minimum: 2,
                      maximum: 255 }

  validates :accept_terms_and_conditions,
    acceptance: true,
    allow_nil: false

  validates_inclusion_of :country,
    in: ISO3166::Country.codes

  validates :username,
            format: { with: /^[a-zA-Z0-9_\.\-]*$/,
                      multiline: true },
            presence: true,
            length: { maximum: 18 },
            uniqueness: true

  after_create :send_confirmation_email, unless: :confirmed?

  def confirmed?
    confirmed_at.present?
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def send_confirmation_email
    self.confirmation_sent_at = Time.now
    ApplicationMailer.send_user_confirmation(self).deliver_now
  end

  def confirmation_token
    ::JsonWebToken.encode(user_id: id, email: email)
  end
end
