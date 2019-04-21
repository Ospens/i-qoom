class DocumentMain < ApplicationRecord
  belongs_to :project

  has_many :revisions, class_name: 'DocumentRevision', foreign_key: 'document_main_id'
end
