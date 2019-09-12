json.array! @users do |user|
  json.merge! user.attributes
  json.document_review_owner user.document_review_owners.find_by(project: @project)
end
