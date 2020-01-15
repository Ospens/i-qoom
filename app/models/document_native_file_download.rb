class DocumentNativeFileDownload < ApplicationRecord
  belongs_to :document

  has_secure_password validations: false

  def to_param
    slug
  end
end
