class MessageRecipientSerializer < ApplicationSerializer
  belongs_to :user

  def attributes(*args)
    object.attributes.symbolize_keys
  end
end