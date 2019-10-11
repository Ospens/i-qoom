class DocumentFieldValue < ApplicationRecord
  belongs_to :document_field

  validates :value,
            :position,
            presence: true

  validates :value,
            format: { with: /\A([A-Z0-9]{3}|---)\z/ },
            if: -> { document_field.validate_codification_values? }

  def build_for_new_document
    attributes.except('id', 'document_field_id', 'created_at', 'updated_at')
  end
end
