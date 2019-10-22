class AddReviewersAndReviewIssuersToDocumentMains < ActiveRecord::Migration[5.2]
  def change
    create_join_table :document_mains, :reviewers
    create_join_table :document_mains, :review_issuers
  end
end
