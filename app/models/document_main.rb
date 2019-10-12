class DocumentMain < ApplicationRecord
  enum document_review_status: [ :in_progress,
                                 :accepted,
                                 :rejected,
                                 :issued_for_approval,
                                 :issued_for_review,
                                 :issued_for_information ]
  belongs_to :project

  has_many :revisions,
           class_name: 'DocumentRevision',
           foreign_key: 'document_main_id'

  has_and_belongs_to_many :reviewers,
                          class_name: 'User',
                          join_table: 'document_mains_reviewers',
                          association_foreign_key: 'reviewer_id',
                          validate: false # for tests

  has_and_belongs_to_many :review_issuers,
                          class_name: 'User',
                          join_table: 'document_mains_review_issuers',
                          association_foreign_key: 'review_issuer_id',
                          validate: false # for tests

  before_create :assign_project_code

  def self.documents_available_for(user)
    return Document.none if !all.any?
    docs =
      if all.first.project.dms_settings.show_all_revisions?(user)
        final_documents = []
        all.each do |main|
          documents = main.revisions.latest_version_of_each_revision
          documents.each do |document|
            if document.present? && document.can_view?(user)
              final_documents << document
            end
          end
        end
        final_documents
      else
        last_versions(user)
      end
    Document.where(id: docs.map(&:id))
  end

  def self.last_versions(user)
    all.map do |main|
      document = main.revisions.last_revision.last_version
      document if document.present? && document.can_view?(user)
    end.compact
  end

  private

  def assign_project_code
    self.project_code = project.project_code
  end
end
