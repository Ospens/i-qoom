class Api::V1::Documents::PlannedController < ApplicationController
  include DocumentConcern
  load_resource :project

  def index
    authorize! :index_planned, Document.new, @project
    result = { document_mains: [], new: {} }
    result[:new] =
      Document.build_from_convention(@project.conventions.active, signed_in_user)
    @project.document_mains.where(planned: true).each do |main|
      main_attrs = { id: main.id }
      document = main.revisions.last_revision.last_version
      main_attrs[:document] =
        main.revisions.last_revision.last_version.attributes_for_edit
      main_attrs[:edit] =
        Document.build_from_convention(document.convention, signed_in_user)
      result[:document_mains] << main_attrs
    end
    render json: result
  end

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
