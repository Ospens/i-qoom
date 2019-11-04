class Message < ApplicationRecord
  enum status: [ :sent,
                 :deleted ]

  has_many_attached :files

  belongs_to :sender,
             class_name: 'User'

  has_many :message_recipients,
           dependent: :destroy

  validates_presence_of :message_recipients

  has_many :recipients,
           through: :message_recipients,
           source: :user

  accepts_nested_attributes_for :message_recipients

  validates :subject,
            presence: true,
            length: { minimum: 2,
                      maximum: 255 }

  validates :body,
            presence: true

  before_create :set_sent_at

  after_create :send_email

  def mark_as_read!(recipient_id)
    message_recipients.find_by(user_id: recipient_id)
                      .try(:mark_as_read!)
  end

  private

  def set_sent_at
    self.sent_at = Time.now
  end

  def send_email
    ApplicationMailer.new_message(self).deliver_now
  end


end
