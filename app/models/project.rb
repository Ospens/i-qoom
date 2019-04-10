class Project < ApplicationRecord
  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }


  belongs_to :user

  has_many :conventions

  has_many :documents
end
