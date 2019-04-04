class DocumentField < ApplicationRecord
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

  belongs_to :parent, polymorphic: true

  has_many :document_rights

  has_many :document_field_values

  accepts_nested_attributes_for :document_field_values

  has_many_attached :files

  before_validation :assign_column_and_row,
                    if: -> { codification_field? && parent.class.name == 'Convention' },
                    on: :create

  before_validation :set_required,
                    if: :codification_field?

  validates :kind,
            presence: true

  validates :codification_kind,
            presence: true,
            if: :codification_field?

  validates :column,
            inclusion: { in: [1, 2] }

  validate :has_field_values,
           if: -> { (codification_field? && !(parent.class.name == 'Convention' && new_record?)) || select_field? || project_phase_field? }

  def build_for_new_document(user)
    return if !can_build?(user)
    original_attributes =
      attributes.except('id', 'parent_id', 'parent_type', 'created_at', 'updated_at')
    if codification_field?
      original_attributes['document_field_values_attributes'] = []
      document_field_values.each do |field_value|
        next unless document_rights.any? && document_rights.find_by(user: user, document_field_value: field_value).present?
        original_attributes['document_field_values_attributes'] << field_value.build_for_new_document
      end
    end
    original_attributes
  end

  def build_for_edit_document
    attributes
    if codification_field?
      original_attributes['document_field_values_attributes'] = []
      document_field_values.each do |field_value|
        original_attributes['document_field_values_attributes'] << field_value.attributes
      end
    end
    attributes
  end

  def can_build?(user)
    return false if parent.class.name != 'Convention'
    can_manage?(user)
  end

  def can_create?(user)
    return false if parent.class.name != 'Document'
    can_manage?(user)
  end

  def can_manage?(user)
    rights = document_rights
    limit_for = DocumentRight.limit_fors
    (codification_field? &&
      (!rights.any? ||
       (rights.any? && rights.where(user: user, limit_for: limit_for[:value]).any?))
    ) ||
    (!codification_field? && rights.where(user: user, limit_for: limit_for[:field]).any?)
  end

  private

  def has_field_values
    if document_field_values.length == 0
      errors.add(:document_field_values, :empty)
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
      case parent.number
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
