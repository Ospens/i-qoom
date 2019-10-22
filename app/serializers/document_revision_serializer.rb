class DocumentRevisionSerializer < ActiveModel::Serializer
  attributes :id,
             :document_id,
             :codification_string,
             :title,
             :review_status,
             :unread_comments_count,
             :review_owners

  has_many :document_review_subjects,
           if: -> { @instance_options[:document_review_subjects] }

  def document
    object.last_version
  end

  def document_id
    document.id
  end

  def codification_string
    document.codification_string
  end

  def title
    document.title
  end

  def review_status
    object.document_main.document_review_status
  end

  def unread_comments_count
    if @instance_options[:user].present?
      subjects = object.document_review_subjects
      DocumentReviewComment.where(document_review_subject: subjects)
                           .unread_by(@instance_options[:user]).count
    end
  end
end
