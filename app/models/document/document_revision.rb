class DocumentRevision < ApplicationRecord
  belongs_to :document_main

  has_many :versions, class_name: 'Document', foreign_key: 'document_revision_id'

  scope :order_by_revision_number, -> { order(revision_number: :asc) }

  scope :last_revision, -> { order_by_revision_number.last }

  scope :last_version, -> { versions.order(revision_version: :asc).last }
end
