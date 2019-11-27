class Api::V1::Documents::PlannedController < ApplicationController
  include DocumentConcern
  load_resource :project

  def create
    authorize! :create_planned, Document.new, @project
    params[:documents].each do |doc_params|
      document = Document.find_by(id: doc_params[:id])
      if document.present?
        document.revision.versions.create!(document_params(doc_params, true))
      else
        main = @project.document_mains.create(planned: true)
        rev = main.revisions.create
        document = rev.versions.create(document_params(doc_params, true))
      end
    end
  end

  private

  def document_params(attrs, assign_attrs = false)
    common_document_params(attrs, assign_attrs, signed_in_user)
  end
end
