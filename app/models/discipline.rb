# can be renamed to ProjectDiscipline
class Discipline < ApplicationRecord
  has_many :project_members
  belongs_to :project

  validates :title,
            presence: true,
            uniqueness: { scope: [:project_id] },
            length: { minimum: 2,
                      maximum: 255 }

  validates_inclusion_of :title,
                          in: ["i-Qoom Admin"],
                          if: -> { title_was == "i-Qoom Admin" },
                          message: :cant_be_changed

end
