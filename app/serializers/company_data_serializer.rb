class CompanyDataSerializer < ApplicationSerializer
  belongs_to :billing_address
  belongs_to :company_address
  
  def attributes(*args)
    object.attributes.symbolize_keys
  end
end