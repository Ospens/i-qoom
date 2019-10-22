class CreateDocumentReviewSubjectsReviewComplete < ActiveRecord::Migration[5.2]
  def change
    create_table :document_review_subjects_review_completes do |t|
      t.references :document_review_subject, foreign_key: true, index: { name: :document_review_subject_id }
      t.references :user, foreign_key: true, index: { name: :user_id }
      t.timestamps
    end
  end
end
