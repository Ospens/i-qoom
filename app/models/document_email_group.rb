class DocumentEmailGroup < ApplicationRecord
  belongs_to :document
  belongs_to :user
  has_many :document_emails

  def create_emails(array)
    array.each do |string|
      if ValidateEmail.valid?(string)
        document_emails.create(email: string)
      elsif (string =~ /^[0-9]+$/) == 0
        user = User.find_by(id: string)
        if user.present?
          document_emails.create(user: user)
        end
      end
    end
  end

  def send_emails
    document_emails.each do |doc_email|
      ApplicationMailer.new_document(self.document, doc_email.detect_email).deliver_later
    end
  end
end
