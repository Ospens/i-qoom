class CreateJoinTableDocumentReviewSubjectsReviewers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :document_review_subjects, :reviewers do |t|
      t.index :document_review_subject_id, name: 'index_document_review_subjects_reviewers_on_subject_id'
      t.index :reviewer_id
    end
  end
end
