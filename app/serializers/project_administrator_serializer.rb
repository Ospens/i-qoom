class ProjectAdministratorSerializer < ApplicationSerializer
  has_one :user, key: :user_attributes
end