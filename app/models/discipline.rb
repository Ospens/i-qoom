# can be renamed to ProjectDiscipline
class Discipline < ApplicationRecord
  has_many :project_members
  belongs_to :project

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }
end
