class MessageSerializer < ApplicationSerializer

  def attributes(*args)
    object.attributes.symbolize_keys
  end
end