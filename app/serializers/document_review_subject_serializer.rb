class DocumentReviewSubjectSerializer < ActiveModel::Serializer
  attributes :id, :status, :title, :document_reference
end
