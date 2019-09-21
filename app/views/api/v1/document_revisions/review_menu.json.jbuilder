json.my_review do
  DocumentMain.document_review_statuses.keys.each do |status|
    json.set! status do
      json.count @my_review.by_document_review_status(status).count
    end
  end
end
json.all_review do
  DocumentMain.document_review_statuses.keys.each do |status|
    json.set! status do
      json.count @all_review.by_document_review_status(status).count
    end
  end
end
