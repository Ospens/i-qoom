class Address < ApplicationRecord
  has_one :project_company_data,
    class_name: "ProjectCompanyData",
    foreign_key: :company_address_id
  has_one :project_company_billing_data,
    class_name: "ProjectCompanyData",
    foreign_key: :billing_address_id
  has_one :project_member,
          foreign_key: :company_address_id

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
                          project_company_data.present? ||
                          project_company_billing_data.present? ||
                          (project_member.present? &&
                            (project_member.creation_step_company_data? ||
                             project_member.creation_step_details? ||
                             project_member.creation_step_pending? ||
                             project_member.creation_step_active? ||
                             !project_member.creator?))
                        }
  
  validates :company_name,
            :street,
            :house_number,
            :city,
            :postcode,
            :country,
            :district,
            :district_court,
            length: { maximum: 255 }

end
