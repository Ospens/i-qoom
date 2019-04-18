class Address < ApplicationRecord
  has_one :project_company_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :company_address_id
  has_one :project_company_billing_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :billing_address_id

  validates_inclusion_of :country,
      in: ISO3166::Country.codes,
      allow_blank: true

  validates_presence_of :company_name,
                        :street_number,
                        :house_number,
                        :city,
                        :postcode,
                        :country,
                        if: -> { project_company_datum.present? }
end
