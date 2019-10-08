class Role < ApplicationRecord
  has_many :project_members
  belongs_to :project

  validates :title,
            presence: true,
            uniqueness: { scope: [:project_id] },
            length: { minimum: 2,
                      maximum: 255 }

  validates_inclusion_of :title,
                          in: ["Project Administrator"],
                          if: -> { title_was == "Project Administrator" },
                          message: :cant_be_changed


end
