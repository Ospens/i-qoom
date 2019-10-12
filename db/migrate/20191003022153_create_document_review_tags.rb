class CreateDocumentReviewTags < ActiveRecord::Migration[5.2]
  def change
    create_table :document_review_tags do |t|
      t.string :name
      t.integer :position, default: 1
      t.references :project, foreign_key: true
      t.timestamps
    end
  end
end
