json.review_issuer serialize_resource(@document_review_subject.review_issuer)
json.reviewers serialize_resource(@document_review_subject.reviewers)
json.comments @document_review_subject.comments do |comment|
  json.merge! comment.attributes
  json.user serialize_resource(comment.user)
end
json.review_completes serialize_resource(@document_review_subject.review_completes)
json.review_counter do
  json.completed @document_review_subject.review_completes.count
  json.total @document_review_subject.reviewers.count + 1
end
