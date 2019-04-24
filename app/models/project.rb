class Project < ApplicationRecord
  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }

  belongs_to :user

  has_many :conventions

  has_many :document_mains

  has_many :documents

  has_many :dms_settings

  accepts_nested_attributes_for :dms_settings
end
