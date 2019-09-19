class DocumentRevisionSerializer < ActiveModel::Serializer
  attributes :id,
             :codification_string,
             :title,
             :review_status

  def document
    object.last_version
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
end
