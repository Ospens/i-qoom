class ConventionField < ApplicationRecord
  enum kind: [ :text_field,
               :select_field,
               :textarea_field,
               :upload_field,
               :date_field,
               :project_phase_field,
               :codification_field ]

  enum codification_kind: [ :originating_company,
                            :receiving_company,
                            :discipline,
                            :document_type,
                            :document_number ]

  belongs_to :convention

  serialize :value

  before_validation :assign_column_and_row,
                    if: :codification_field?,
                    on: :create

  before_validation :set_required,
                    if: :codification_field?

  validates :kind,
            presence: true

  validates :codification_kind,
            presence: true,
            if: :codification_field?

  validates :required,
            inclusion: { in: [true] },
            if: :codification_field?

  validates :column,
            inclusion: { in: [1, 2] }

  validate :value_is_string,
           if: -> { text_field? || textarea_field? || upload_field? || date_field? }

  validate :validate_value_is_array_of_strings,
           if: -> { select_field? || project_phase_field? }

  validate :value_valid_for_codification,
           if: :codification_field?

  private

  def value_is_string
    errors.add(:value, :not_string) unless value.is_a?(String)
  end

  def value_is_array_of_strings
    value.is_a?(Array) && value.any? && !value.any? { |i| i.blank? }
  end

  def validate_value_is_array_of_strings
    errors.add(:value, :not_array_of_strings) unless value_is_array_of_strings
  end

  def value_valid_for_codification
    if value_is_array_of_strings &&
        value.any? { |i| !i.is_a?(Hash) || i[:code].blank? || i[:position].blank? }
      errors.add(:value, :not_valid_for_codification)
    end
  end

  def assign_column_and_row
    case codification_kind
    when 'originating_company'
      self.column = 1
      self.row = 3
    when 'receiving_company'
      self.column = 1
      self.row = 4
    when 'discipline'
      case convention.number
      when 1
        self.column = 1
        self.row = 4
      when 2
        self.column = 1
        self.row = 5
      end
    when 'document_type'
      self.column = 2
      self.row = 1
    when 'document_number'
      self.column = 2
      self.row = 2
    end
  end

  def set_required
    self.required = true
  end
end
