class ProjectAdministrator < ApplicationRecord

  enum status: [ :awaiting_confirmation,
                 :active ]

  belongs_to :project

  belongs_to :user, required: false

  validates :email,
            email: true,
            presence: true

end
