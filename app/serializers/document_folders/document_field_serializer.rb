module DocumentFolders
  class DocumentFieldSerializer < ActiveModel::Serializer
    attributes :id,
               :codification_kind,
               :value
  end
end
