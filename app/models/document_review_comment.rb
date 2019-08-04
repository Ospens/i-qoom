class DocumentReviewComment < ApplicationRecord
  validates :text,
            presence: true
end
