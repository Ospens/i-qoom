class DocumentReviewSubjectsTag < ApplicationRecord
  belongs_to :document_review_subject

  belongs_to :document_review_tag, foreign_key: 'tag_id'

  validate :equal_projects

  private

  def equal_projects
    if document_review_subject.project != document_review_tag.project
      errors.add(:document_review_tag, :tag_is_not_belong_to_this_project)
    end
  end
end
