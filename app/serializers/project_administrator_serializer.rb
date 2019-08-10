class ProjectAdministratorSerializer < ApplicationSerializer
  has_one :user
  
  def attributes(*args)
    object.attributes.symbolize_keys
  end
end