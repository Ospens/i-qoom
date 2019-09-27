class ProjectSerializer < ApplicationSerializer
  has_many :admins do
    object.admins.order(id: :asc)
  end
  has_one :company_data, serializer: CompanyDataSerializer

  def attributes(*args)
    object.attributes.symbolize_keys.tap do |keys|
      if !object.dms_access?(@instance_options[:user])
        keys.except!(:project_code)
      end
    end
  end
end
