class Api::V1::DocumentRevisionsController < ApplicationController
  load_and_authorize_resource

  def update_review_status
    main = @document_revision.document_main
    if main.update(document_review_status: params[:status])
      head 200
    else
      render json: main.errors, status: :unprocessable_entity
    end
  end
end
