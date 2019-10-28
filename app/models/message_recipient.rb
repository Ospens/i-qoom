class MessageRecipient < ApplicationRecord
  enum status: [ :unread,
                 :read,
                 :deleted ]

  belongs_to :user

  belongs_to :message

  def mark_as_read!
    update(read_at: Time.now, status: "read") if unread?
  end

end
