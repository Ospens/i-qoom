class DocumentRight < ApplicationRecord
  enum limit_for: [ :field, :value ], _prefix: true

  belongs_to :user
  belongs_to :document_field
  belongs_to :document_field_value, optional: true

  validates :user,
            :document_field,
            presence: true

  validate :limit_for_based_on_field_kind

  private

  def limit_for_based_on_field_kind
    if document_field.codification_field? && !limit_for_value?
      errors.add(:limit_for, :must_be_limit_for_value)
    elsif !document_field.codification_field? && !limit_for_field?
      errors.add(:limit_for, :must_be_limit_for_field)
    end
  end
end
