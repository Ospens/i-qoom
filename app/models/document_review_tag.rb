class DocumentReviewTag < ApplicationRecord
  belongs_to :project

  has_many :document_review_subjects_tags

  has_many :subjects,
           through: :document_review_subjects_tags,
           source: :document_review_subjects

  validates :name,
            presence: true
end
