class Document < ApplicationRecord
  enum issued_for: [ :information, :review ], _prefix: true

  belongs_to :user

  belongs_to :project

  belongs_to :revision, class_name: 'DocumentRevision', foreign_key: 'document_revision_id'

  has_many :document_fields, as: :parent

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

  scope :last_version, -> { order(revision_version: :asc).last }

  def self.build_from_convention(convention, user)
    doc = self.new.attributes.except('id', 'created_at', 'updated_at')
    doc['document_fields_attributes'] = []
    convention.document_fields.each do |field|
      field_attributes = field.build_for_new_document(user)
      if field_attributes.present?
        doc['document_fields_attributes'] << field_attributes
      end
    end
    doc
  end

  def can_create?(user)
    # user cannot create document if he has no access to at least one value
    # for each field that can be limited by value
    !project.conventions.active.document_fields.limit_by_value.map do |field|
      field.document_rights.where(user: user, limit_for: :value).any?
    end.include?(false)
  end

  def attributes_for_edit
    doc = attributes
    doc['document_fields_attributes'] = []
    document_fields.each do |field|
      field_attributes = field.build_for_edit_document
      if field_attributes.present?
        doc['document_fields_attributes'] << field_attributes
      end
    end
    doc
  end
end
