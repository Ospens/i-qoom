class DocumentVersion < Document
  belongs_to :revision, class_name: 'DocumentRevision', foreign_key: 'revision_id'

  scope :order_by_revision_version, -> { order(revision_version: :asc) }

  scope :last_version, -> { order_by_revision_version.last }
end
