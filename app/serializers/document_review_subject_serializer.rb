class DocumentReviewSubjectSerializer < ActiveModel::Serializer
  attributes :id,
             :status,
             :title,
             :document_reference,
             :review_issuer_id,
             :reviewer_ids,
             :comment
end
