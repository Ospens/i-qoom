class DocumentFolder < ApplicationRecord
  belongs_to :project

  belongs_to :user

  has_many :document_fields,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  accepts_nested_attributes_for :document_fields

  has_and_belongs_to_many :document_mains

  validate :document_fields_values

  def convention
    project.conventions.active
  end

  def originating_company
    document_fields.find_by(codification_kind: :originating_company)
  end

  def discipline
    document_fields.find_by(codification_kind: :discipline)
  end

  def document_type
    document_fields.find_by(codification_kind: :document_type)
  end

  def document_number
    document_fields.find_by(codification_kind: :document_number)
  end

  def all_documents
    all_docs = project.document_mains.documents_available_for(user)
    if originating_company.present?
      value = originating_company.value
      all_docs = all_docs.filter_by_codification_kind(:originating_company, value)
    end
    if discipline.present?
      value = discipline.value
      all_docs = all_docs.filter_by_codification_kind(:discipline, value)
    end
    if document_type.present?
      value = document_type.value
      all_docs = all_docs.filter_by_codification_kind(:document_type, value)
    end
    if document_number.present?
      value = document_number.value
      all_docs = all_docs.filter_by_codification_kind(:document_number, value)
    end
    Document.find(document_mains.last_versions(user).pluck(:id) + all_docs.pluck(:id))
  end

  def document_fields_values
    document_fields.each do |field|
      next if !(field.originating_company? || field.discipline? || field.document_type?)
      con_field = convention.document_fields
                            .find_by(codification_kind: field.codification_kind)
      if !con_field.document_field_values.pluck(:value).include?(field.value)
        errors.add(:document_fields, :value_is_not_exist_in_convention)
      end
    end
  end

  def allowed_to_add_document?(document, user_to_check)
    user == user_to_check &&
    !document_mains.last_versions(user).include?(document) &&
    project.document_mains.documents_available_for(user_to_check).include?(document)
  end

  def self.select_folders_index(user_id, project_id, document_id)
    document_main = Document.find(document_id).revision.document_main
    find_by_sql([
      'SELECT
        t1.*,
        exists(
          SELECT true
          FROM document_folders_mains
          WHERE t1.id = document_folder_id AND document_main_id = ?
        ) AS enabled
      FROM "document_folders" AS t1
      WHERE t1.user_id = ? AND t1.project_id = ?
      ORDER BY t1.id ASC',
      document_main.id,
      user_id.to_i,
      project_id.to_i
    ])
  end
end
