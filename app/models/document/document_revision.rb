class DocumentRevision < Document
  belongs_to :document_main, class_name: 'DocumentMain', foreign_key: 'main_id'

  has_many :versions, class_name: 'DocumentVersion', foreign_key: 'revision_id'

  scope :order_by_revision_number, -> { order(revision_number: :asc) }

  scope :last_revision, -> { order_by_revision_number.last }
end
