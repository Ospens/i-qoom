class DocumentFolderSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :project_id

  attribute :enabled,
            if: -> { object.respond_to?(:enabled) }

  has_many :document_fields,
           serializer: DocumentFolders::DocumentFieldSerializer
end
