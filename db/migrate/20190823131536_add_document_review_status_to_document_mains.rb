class AddDocumentReviewStatusToDocumentMains < ActiveRecord::Migration[5.2]
  def change
    add_column :document_mains, :document_review_status, :integer, default: 0
  end
end
