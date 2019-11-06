class MessageSerializer < ApplicationSerializer
  has_many :message_recipients

  belongs_to :sender

  def attributes(*args)
    object.attributes.symbolize_keys.merge(files: files)
  end

  def message_recipients
    if object.sender_id == @instance_options[:user].try(:id)
      object.message_recipients
    else
      object.message_recipients.where(user_id: @instance_options[:user].try(:id))
    end
  end

  def files
    object.files.attachments.map do |attachment|
      Rails.application.routes.url_helpers.url_for(attachment)
    end
  end
end