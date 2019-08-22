json.review_issuer @document_review_subject.review_issuer
json.reviewers @document_review_subject.reviewers
json.comments @document_review_subject.comments do |comment|
  json.merge! comment.attributes
  json.user comment.user
end
