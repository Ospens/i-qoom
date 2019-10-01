class DocumentReviewComment < ApplicationRecord
  acts_as_readable

  belongs_to :document_review_subject

  belongs_to :user

  has_one_attached :file,
                   dependent: :purge

  validates :text,
            presence: true
end
