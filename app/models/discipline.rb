class Discipline < ApplicationRecord
  has_many :project_members

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }
end
