class DocumentFolder < ApplicationRecord
  belongs_to :project

  belongs_to :user

  has_many :document_fields,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  has_and_belongs_to_many :documents

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
    Document.find(documents.pluck(:id) + all_docs.pluck(:id))
  end
end
