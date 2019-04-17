class Address < ApplicationRecord
  validates_inclusion_of :country,
      in: ISO3166::Country.codes,
      allow_blank: true
  has_one :project_company_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :company_address_id
  has_one :project_company_billing_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :billing_address_id
end
