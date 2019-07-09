class ProjectMemberSerializer < ApplicationSerializer
  belongs_to :company_address, key: :company_address_attributes
end