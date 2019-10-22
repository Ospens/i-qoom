class MessageRecipient < ApplicationRecord
  enum status: [ :unread,
                 :read,
                 :deleted ]

  belongs_to :user

  belongs_to :message

end
