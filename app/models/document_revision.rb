class DocumentRevision < ApplicationRecord
  belongs_to :document_main

  has_many :versions, class_name: 'Document', foreign_key: 'document_revision_id'

  has_many :document_review_subjects

  scope :order_by_revision_number, -> { order(revision_number: :asc) }

  scope :last_revision, -> { order_by_revision_number.last }

  scope :latest_version_of_each_revision, -> { map(&:last_version) }

  def last_version
    versions.order(revision_version: :asc).last
  end
end
