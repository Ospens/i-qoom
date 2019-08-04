class CreateDocumentReviewComments < ActiveRecord::Migration[5.2]
  def change
    create_table :document_review_comments do |t|
      t.references :document_review_subject, foreign_key: true
      t.references :user, foreign_key: true
      t.text :text
    end
  end
end
