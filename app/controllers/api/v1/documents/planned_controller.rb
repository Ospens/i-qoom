class Api::V1::Documents::PlannedController < ApplicationController
  include DocumentConcern
  load_resource :project
  load_resource :document_main,
                only: :destroy,
                id_param: :id

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
