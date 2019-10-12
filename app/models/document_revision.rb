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

  scope :where_can_review, -> (users) {
    issuer =
      joins(:document_review_subjects)
        .where(document_review_subjects: { review_issuer: users })
    reviewer =
      joins(document_review_subjects: :reviewers)
        .where(document_review_subjects_reviewers: { reviewer_id: users })
    where(id: issuer.pluck(:id) + reviewer.pluck(:id))
  }

  scope :by_document_review_status, -> (status) {
    joins(:document_main)
      .where(document_mains: { document_review_status: status })
  }

  scope :by_project, -> (project) {
    joins(:project).where(projects: { id: project.id })
  }

  scope :where_review_owner, -> (project, user) {
    owners = project.document_review_owners.where(user: user)
    originating_companies = owners.pluck(:originating_company)
    joins(versions: { document_fields: :document_field_values })
      .where(document_fields: {
               codification_kind: DocumentField.codification_kinds[:originating_company]
             },
             document_field_values: { selected: true, value: originating_companies })
  }

  scope :all_review, -> (project, user) {
    owner = where_review_owner(project, user)
    reviewer = where_can_review(user)
    where(id: owner.pluck(:id) + reviewer.pluck(:id))
  }

  def last_version
    versions.last_version
  end

  def can_update_review_status?(user)
    review_owners.include?(user)
  end

  def review_owners
    originating_company_value =
      last_version.document_fields
                  .find_by(codification_kind: :originating_company)
                  .document_field_values.find_by(selected: true).value
    owners =
      project.document_review_owners
             .where(originating_company: originating_company_value)
    User.where(id: owners.pluck(:user_id))
  end
end
