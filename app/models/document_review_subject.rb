class DocumentReviewSubject < ApplicationRecord
  enum status: [ :in_progress,
                 :accepted,
                 :rejected,
                 :issued_for_approval,
                 :issued_for_review ]

  belongs_to :document_revision

  belongs_to :user

  belongs_to :review_issuer,
             class_name: 'User'
end
