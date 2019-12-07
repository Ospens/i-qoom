class Api::V1::Documents::PlannedController < ApplicationController
  include DocumentConcern
  load_resource :project
  load_resource :document_main,
                only: :destroy,
                id_param: :id

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

  def destroy
    authorize! :destroy_planned, Document.new, @project
    if @document_main.planned?
      @document_main.destroy
      head 200
    else
      head 403
    end
  end

  private

  def document_params(attrs, assign_attrs = false)
    common_document_params(attrs, assign_attrs, signed_in_user)
  end
end
