class DocumentReviewSubject < ApplicationRecord
  enum status: [ :in_progress,
                 :accepted,
                 :rejected,
                 :issued_for_approval,
                 :issued_for_review ]

  attr_accessor :comment

  belongs_to :document_revision

  belongs_to :user

  belongs_to :review_issuer,
             class_name: 'User'

  has_and_belongs_to_many :reviewers,
                          class_name: 'User',
                          join_table: 'document_review_subjects_reviewers',
                          association_foreign_key: 'reviewer_id',
                          validate: false # for tests

  has_many :comments,
           class_name: 'DocumentReviewComment'

  validates :reviewers,
            length: { minimum: 1 }

  before_create :set_status_in_progress,
                if: -> { status.blank? }

  after_create :create_comment,
               if: -> { comment.present? }

  private

  def set_status_in_progress
    self.status = :in_progress
  end

  def create_comment
    comments.create(text: comment, user: user)
  end
end
