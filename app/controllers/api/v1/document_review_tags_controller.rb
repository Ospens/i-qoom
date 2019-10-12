class Api::V1::DocumentReviewTagsController < ApplicationController
  load_resource :project
  load_resource through: :project
  before_action :authorize_tag

  def create
    tag = @project.document_review_tags.new(document_review_tag_params)
    if tag.save
      render json: tag
    else
      render json: tag.errors
    end
  end

  def update
    if @document_review_tag.update(document_review_tag_params)
      render json: @document_review_tag
    else
      render json: @document_review_tag.errors
    end
  end

  def destroy
    @document_review_tag.destroy
    head 200
  end

  def index
    render json: @project.document_review_tags
  end

  private

  def document_review_tag_params
    params.require(:document_review_tag).permit(:name,
                                                :position)
  end

  def authorize_tag
    authorize! :manage, DocumentReviewTag.new, @project
  end
end
