class CompanyDataSerializer < ApplicationSerializer
  belongs_to :billing_address
  belongs_to :company_address
end