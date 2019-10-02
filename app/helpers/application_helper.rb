module ApplicationHelper
  def serialize_resource(resource)
    ActiveModelSerializers::SerializableResource.new(resource)
  end
end
