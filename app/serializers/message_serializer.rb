class MessageSerializer < ApplicationSerializer
  has_many :message_recipients

  def attributes(*args)
    object.attributes.symbolize_keys
  end
end