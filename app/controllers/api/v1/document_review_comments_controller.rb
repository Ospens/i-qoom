class Api::V1::DocumentReviewCommentsController < ApplicationController
  load_resource :document_review_subject
  load_resource :document_review_comment,
                through: :document_review_subject,
                through_association: :comments
  authorize_resource :document_review_comment

  def new
    render json: DocumentReviewComment.new
  end

  def create
    comment = signed_in_user.document_review_comments.new(document_review_comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors
    end
  end

  private

  def document_review_comment_params
    params.require(:document_review_comment)
          .permit(:text,
                  :file)
          .merge(document_review_subject_id: @document_review_subject.id)
  end
end
