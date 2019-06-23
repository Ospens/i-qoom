class Address < ApplicationRecord
  has_one :project_company_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :company_address_id
  has_one :project_company_billing_datum,
    class_name: "ProjectCompanyDatum",
    foreign_key: :billing_address_id
  has_one :project_member,
          foreign_key: :member_company_address_id

  validates_inclusion_of :country,
      in: ISO3166::Country.codes,
      allow_blank: true

  validates_presence_of :company_name,
                        :street,
                        :house_number,
                        :city,
                        :postcode,
                        :country,
                        if: -> {
                          project_company_datum.present? ||
                          project_company_billing_datum.present? ||
                          (project_member.present? &&
                            (!project_member.creation_step_employment_type? &&
                             !project_member.creation_step_company_type?))
                        }
end
