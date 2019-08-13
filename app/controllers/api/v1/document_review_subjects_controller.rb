class Api::V1::DocumentReviewSubjectsController < ApplicationController
  load_resource :document
  load_resource :document_revision
  before_action :set_revision,
                if: -> { @document.present? && @document_revision.blank? }
  load_resource :document_review_subject, through: :document_revision
  authorize_resource :document_review_subject, except: [:index]

  def new
    render json: DocumentReviewSubject.new
  end

  def create
    subject =
      signed_in_user.document_review_subjects
                    .new(document_review_subject_params)
    if subject.save
      render json: subject
    else
      render json: subject.errors, status: :unprocessable_entity
    end
  end

  def index
    authorize! :show, @document_revision
    render json: @document_revision.document_review_subjects
  end

  private

  def document_review_subject_params
    params.require(:document_review_subject)
          .permit(:title,
                  :document_reference,
                  :status,
                  :review_issuer_id,
                  :comment,
                  reviewer_ids: [])
          .merge(document_revision_id: @document_revision.id)
  end

  def set_revision
    @document_revision = @document.revision
  end
end
