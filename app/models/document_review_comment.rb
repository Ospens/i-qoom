class DocumentReviewComment < ApplicationRecord
  belongs_to :document_review_subject

  belongs_to :user

  validates :text,
            presence: true
end
