class Message < ApplicationRecord
  enum recipient_status: [ :unread,
                           :read,
                           :deleted ],
                          _prefix: true

  enum sender_status: [ :sent,
                        :deleted ],
                       _prefix: true

  has_many_attached :files
  
  belongs_to :sender,
             class_name: 'User'

  belongs_to :recipient,
             class_name: 'User'
  
  validates :subject,
            presence: true,
            length: { minimum: 2,
                      maximum: 255 }
  
  validates :body,
            presence: true

end
