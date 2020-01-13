class DocumentEmail < ApplicationRecord
  belongs_to :document_email_group
  belongs_to :user,
             optional: true

  def self.check_if_string_valid?(string)
    ValidateEmail.valid?(string) || (string =~ /^[0-9]+$/) == 0
  end

  def detect_email
    user.present? ? user.email : email
  end
end
