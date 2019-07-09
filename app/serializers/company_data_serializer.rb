class CompanyDataSerializer < ApplicationSerializer
  belongs_to :billing_address, key: :billing_address_attributes
  belongs_to :company_address, key: :company_address_attributes
end