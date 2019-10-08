class Api::V1::DocumentReviewSubjectsController < ApplicationController
  include ActiveStorage::SendZip

  load_resource :document
  load_resource :document_revision
  before_action :set_revision,
                if: -> { @document.present? && @document_revision.blank? }
  load_resource :document_review_subject,
                through: :document_revision,
                if: -> { @document_revision.present? }
  load_resource :document_review_subject,
                if: -> { @document_revision.blank? }
  authorize_resource :document_review_subject, except: [:index]

  def new
    render json: @document.revision.document_review_subjects.new
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
    render json: @document_revision.document_review_subjects, user: signed_in_user
  end

  def show
    render formats: :json
  end

  def update_status
    if @document_review_subject.update(status: params[:status])
      head 200
    else
      render json: @document_review_subject.errors, status: :unprocessable_entity
    end
  end

  def complete_review
    if params['complete'] == '1'
      unless @document_review_subject.review_completes.include?(signed_in_user)
        @document_review_subject.review_completes << signed_in_user
      end
      render json: { message: 'Review completed' }
    else
      @document_review_subject.review_completes.delete(signed_in_user)
      render json: { message: 'Review uncompleted' }
    end
  end

  def download_files
    files = @document_review_subject.comments.map(&:file)
    send_zip(files, filename: "#{@document_review_subject.title.underscore}_files.zip")
  end

  private

  def document_review_subject_params
    params.require(:document_review_subject)
          .permit(:title,
                  :document_reference,
                  :review_issuer_id,
                  :comment,
                  reviewer_ids: [],
                  tag_ids: [])
          .merge(document_revision_id: @document_revision.id)
  end

  def set_revision
    @document_revision = @document.revision
  end
end
