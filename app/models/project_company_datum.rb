class ProjectCompanyDatum < ApplicationRecord
  belongs_to :project

  validates_presence_of :vat_id
end
