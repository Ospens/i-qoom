class ProjectMemberSerializer < ApplicationSerializer
  belongs_to :company_address
  
  def attributes(*args)
    object.attributes.symbolize_keys
  end
end