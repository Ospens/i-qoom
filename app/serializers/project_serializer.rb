class ProjectSerializer < ApplicationSerializer
  has_many :admins do
    object.admins.order(id: :asc)
  end
  has_one :company_data, serializer: CompanyDataSerializer
end