class ProjectSerializer < ApplicationSerializer
  has_many :admins
  has_one :company_datum, serializer: CompanyDatumSerializer
end