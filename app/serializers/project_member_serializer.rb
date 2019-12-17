class ProjectMemberSerializer < ApplicationSerializer
  belongs_to :company_address
  belongs_to :user
  
  def attributes(*args)
    object.attributes.symbolize_keys
  end
end