class Api::V1::DocumentReviewSubjectsController < ApplicationController
  load_resource :document_revision
  load_resource :document_review_subject,
                through: :document_revision,
                only: [ :new, :create ]
  authorize_resource :document_review_subject

  def new
    render json: @document_review_subject
  end

  def create
    render json: {}
  end

  private

  def document_review_subject_params
  end
end
