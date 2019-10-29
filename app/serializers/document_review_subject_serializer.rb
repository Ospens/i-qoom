class DocumentReviewSubjectSerializer < ActiveModel::Serializer
  attributes :id,
             :status,
             :title,
             :document_reference,
             :review_issuer_id,
             :reviewer_ids,
             :comment,
             :unread_comments_count,
             :tags,
             :all_tags,
             :reviewers,
             :review_issuers

  def unread_comments_count
    if @instance_options[:user].present?
      object.comments.unread_by(@instance_options[:user]).count
    end
  end

  def serialize_resource(resource)
    ActiveModelSerializers::SerializableResource.new(resource)
  end

  def all_tags
    serialize_resource(object.project.document_review_tags)
  end

  def document_main
    object.document_revision.document_main
  end

  def user_attrs(collection)
    collection.as_json(only: [:id, :first_name, :last_name, :username])
  end

  def reviewers
    if object.new_record?
      user_attrs(document_main.reviewers)
    end
  end

  def review_issuers
    if object.new_record?
      user_attrs(document_main.review_issuers)
    end
  end
end
