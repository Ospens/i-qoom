class Api::V1::DocumentRevisionsController < ApplicationController
  load_resource :project
  load_and_authorize_resource except: [ :review_menu ]

  def update_review_status
    main = @document_revision.document_main
    if main.update(document_review_status: params[:status])
      head 200
    else
      render json: main.errors, status: :unprocessable_entity
    end
  end

  def review_menu
    authorize! :review_menu, DocumentRevision.new, @project
    revisions = DocumentRevision.by_project(@project)
    @my_review = revisions.where_review_owner(@project, signed_in_user)
    @all_review = revisions.all_review(@project, signed_in_user)
    render formats: :json
  end

  def review_index
    authorize! :review_index, DocumentRevision.new, @project
    revisions = DocumentRevision.by_project(@project)
    if params[:scope] == 'my_review'
      revisions = revisions.where_review_owner(@project, signed_in_user)
    elsif params[:scope] == 'all_review'
      revisions = revisions.all_review(@project, signed_in_user)
    else
      revisions = DocumentRevision.none
    end
    if params[:review_status].present?
      revisions = revisions.by_document_review_status(params[:review_status])
    end
    render json: revisions
  end
end
