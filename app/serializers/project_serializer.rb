class ProjectSerializer < ApplicationSerializer
  has_many :admins do
    object.admins.order(id: :asc)
  end
  has_one :company_data, serializer: CompanyDataSerializer
  
  def attributes(*args)
    object.attributes.symbolize_keys
  end
end