class CreateJoinTableDocumentReviewSubjectsTags < ActiveRecord::Migration[5.2]
  def change
    create_join_table :document_review_subjects, :tags do |t|
      t.index :document_review_subject_id, name: 'index_on_document_review_subject_id'
      t.index :tag_id
    end
  end
end
