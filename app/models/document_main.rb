class DocumentMain < ApplicationRecord
  belongs_to :project

  has_many :revisions,
           class_name: 'DocumentRevision',
           foreign_key: 'document_main_id'

  before_create :assign_project_code

  def self.documents_available_for(user)
    return all if !all.any?
    if all.first.project.dms_settings.show_all_revisions?(user)
      final_documents = []
      all.each do |main|
        documents = main.revisions.latest_version_of_each_revision
        documents.each do |document|
          final_documents << document if document.can_view?(user)
        end
      end
      final_documents
    else
      last_versions(user)
    end
  end

  def self.last_versions(user)
    all.map do |main|
      document = main.revisions.last_revision.last_version
      document if document.can_view?(user)
    end.compact
  end

  private

  def assign_project_code
    self.project_code = project.project_code
  end
end
