class CreateDocumentReviewOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :document_review_owners do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.string :originating_company

      t.timestamps
    end
  end
end
