class Api::V1::Documents::PlannedController < ApplicationController
  include DocumentConcern
  load_resource :project

  def index
    authorize! :index_planned, Document.new, @project
    result = { document_mains: [], new: {} }
    result[:new] =
      Document.build_from_convention(@project.conventions.active, signed_in_user)
    @project.document_mains.where(planned: true).order(position: :asc).each do |main|
      main_attrs = main.as_json(only: [:id, :position])
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
    params[:document_mains].each do |main_params|
      main = DocumentMain.find_by(id: main_params[:id])
      if main.present?
        document = main.revisions.last_revision.last_version
        document.revision.versions.create!(document_params(main_params[:document], true))
      else
        main = @project.document_mains.create(planned: true, position: main_params[:position])
        rev = main.revisions.create
        document = rev.versions.create(document_params(main_params[:document], true))
      end
    end
  end

  private

  def document_params(attrs, assign_attrs = false)
    common_document_params(attrs, assign_attrs, signed_in_user)
  end
end
