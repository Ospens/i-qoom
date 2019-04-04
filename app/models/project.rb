class Project < ApplicationRecord

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }


  belongs_to :user
  
end
