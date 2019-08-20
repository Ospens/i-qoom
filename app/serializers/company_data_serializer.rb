class CompanyDataSerializer < ApplicationSerializer
  belongs_to :billing_address
  belongs_to :company_address

  def attributes(*args)
    object.attributes.symbolize_keys.merge(logo: logo)
  end

  def logo
    Rails.application.routes.url_helpers.url_for(object.logo) if object.logo.attached?
  end

end