class DocumentMain < ApplicationRecord
  belongs_to :project

  has_many :revisions, class_name: 'DocumentRevision', foreign_key: 'document_main_id'

  def self.documents_available_for(user)
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
      all.map do |main|
        document = main.revisions.last_revision.last_version
        document if document.can_view?(user)
      end.compact
    end
  end
end
