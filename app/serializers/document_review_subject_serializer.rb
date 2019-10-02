class DocumentReviewSubjectSerializer < ActiveModel::Serializer
  attributes :id,
             :status,
             :title,
             :document_reference,
             :review_issuer_id,
             :reviewer_ids,
             :comment,
             :unread_comments_count

  def unread_comments_count
    if @instance_options[:user].present?
      object.comments.unread_by(@instance_options[:user]).count
    end
  end
end
