class DocumentRevisionSerializer < ActiveModel::Serializer
  attributes :id,
             :codification_string,
             :title

  def document
    object.last_version
  end

  def codification_string
    document.codification_string
  end

  def title
    document.title
  end
end
