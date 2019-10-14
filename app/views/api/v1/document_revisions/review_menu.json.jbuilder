json.my_review do
  subjects = DocumentReviewSubject.where(document_revision: @my_review)
  comments = DocumentReviewComment.where(document_review_subject: subjects)
  json.unread_comments comments.unread_by(@user).count
  json.set! :statuses do
    DocumentMain.document_review_statuses.keys.each do |status|
      json.set! status do
        json.count @my_review.by_document_review_status(status).count
      end
    end
  end
end
json.all_review do
  subjects = DocumentReviewSubject.where(document_revision: @all_review)
  comments = DocumentReviewComment.where(document_review_subject: subjects)
  json.unread_comments comments.unread_by(@user).count
  json.set! :statuses do
    DocumentMain.document_review_statuses.keys.each do |status|
      json.set! status do
        json.count @all_review.by_document_review_status(status).count
      end
    end
  end
end
