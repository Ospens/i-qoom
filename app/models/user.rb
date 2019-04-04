class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable

  attr_accessor :accept_terms_and_conditions

  has_many :documents

  validates_presence_of :password_confirmation,
    on: [:create, :password_changed?]

  validates_presence_of :first_name,
                        :last_name,
                        :country

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

  has_many :projects

end
