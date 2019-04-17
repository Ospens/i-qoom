class ProjectCompanyDatum < ApplicationRecord
  belongs_to :project

  validates_presence_of :vat_id
  belongs_to :company_address,
    class_name: "Address"
  belongs_to :billing_address,
    class_name: "Address"
end
