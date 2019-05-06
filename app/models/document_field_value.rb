class DocumentFieldValue < ApplicationRecord
  belongs_to :document_field

  validates :value,
            :position,
            presence: true

  def build_for_new_document
    attributes.except('id', 'document_field_id', 'created_at', 'updated_at')
  end
end
