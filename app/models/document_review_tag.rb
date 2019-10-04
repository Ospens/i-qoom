class DocumentReviewTag < ApplicationRecord
  belongs_to :project

  validates :name,
            presence: true
end
