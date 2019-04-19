class DocumentMain < Document
  has_many :revisions, class_name: 'DocumentRevision', foreign_key: 'main_id'
end
