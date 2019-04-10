class ProjectAdministrator < ApplicationRecord

  belongs_to :project

  belongs_to :user, required: false

end
