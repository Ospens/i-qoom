class DocumentRevision < ApplicationRecord
  belongs_to :document_main

  has_many :versions, class_name: 'Document', foreign_key: 'document_revision_id'

  has_many :document_review_subjects

  has_one :project,
          through: :document_main

  scope :order_by_revision_number, -> { order(revision_number: :asc) }

  scope :first_revision, -> { order_by_revision_number.first }

  scope :last_revision, -> { order_by_revision_number.last }

  scope :latest_version_of_each_revision, -> { map(&:last_version) }

  def last_version
    versions.last_version
  end

  def can_update_review_status?(user)
    owner = project.document_review_owners.find_by(user_id: user.id)
    return false if owner.blank?
    originating_company_value =
      last_version.document_fields
                  .find_by(codification_kind: :originating_company)
                  .document_field_values.find_by(selected: true).value
    owner.originating_company == originating_company_value
  end
end
