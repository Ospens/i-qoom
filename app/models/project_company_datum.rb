class ProjectCompanyDatum < ApplicationRecord
  validates_presence_of :vat_id

  belongs_to :project

  belongs_to :company_address,
    class_name: "Address"
  belongs_to :billing_address,
    class_name: "Address"

  accepts_nested_attributes_for :company_address,
                                :billing_address
end
