class Project < ApplicationRecord

  enum creation_step: [ :admins,
                        :name,
                        :company_datum,
                        :billing_address,
                        :done ],
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
  accepts_nested_attributes_for :company_datum,
                                update_only: true

  validates_presence_of :admins

  validates_presence_of :company_datum,
    unless: -> { creation_step_admins? || creation_step_name? }

  # update status to done if valid? method

end
