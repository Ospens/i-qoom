class AddReviewIssuerToDocumentReviewSubjects < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_review_subjects, :review_issuer, index: true
    add_foreign_key :document_review_subjects, :users, column: :review_issuer_id
  end
end
