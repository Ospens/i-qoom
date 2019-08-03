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

  has_and_belongs_to_many :reviewers,
                          class_name: 'User',
                          join_table: 'document_review_subjects_reviewers',
                          association_foreign_key: 'reviewer_id',
                          validate: false # for tests

  validates :reviewers,
            length: { minimum: 1 }
end
