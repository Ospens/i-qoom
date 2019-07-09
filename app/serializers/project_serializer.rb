class ProjectSerializer < ApplicationSerializer
  has_many :admins, key: :admins_attributes do
    object.admins.order(id: :asc)
  end
  has_one :company_data, serializer: CompanyDataSerializer,
          key: :company_data_attributes
end