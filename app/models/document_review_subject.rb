class DocumentReviewSubject < ApplicationRecord
  enum status: [ :in_progress,
                 :accepted,
                 :rejected,
                 :issued_for_approval,
                 :issued_for_review ]
end
