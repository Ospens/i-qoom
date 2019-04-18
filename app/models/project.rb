class Project < ApplicationRecord

  enum creation_step: [:admins, :name, :company_datum, :done],
                      _prefix: true

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 },
            unless: :creation_step_admins?


  belongs_to :user
  has_many :admins, class_name: "ProjectAdministrator"
  has_one :company_datum, class_name: "ProjectCompanyDatum"

  accepts_nested_attributes_for :admins

  validates_presence_of :admins

  validates_presence_of :company_datum,
    if: -> { creation_step_company_datum? || creation_step_done? }

  # update status to done if valid? method

end
