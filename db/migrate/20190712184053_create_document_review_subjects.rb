class CreateDocumentReviewSubjects < ActiveRecord::Migration[5.2]
  def change
    create_table :document_review_subjects do |t|
      t.integer :status, default: 0
      t.string :title
      t.string :document_reference
      t.references :document_revision, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
