class Api::V1::DocumentReviewOwnersController < ApplicationController
  load_resource :project, id_param: :project_id
  # this doing both: create and update
  def update
    find_params = document_review_owner_params.slice(:user_id, :project_id)
    review_owner = DocumentReviewOwner.find_or_initialize_by(find_params)
    authorize! :update, review_owner
    review_owner.assign_attributes(document_review_owner_params)
    if review_owner.save
      render json: review_owner
    else
      render json: review_owner.errors, status: :unprocessable_entity
    end
  end

  def index
    authorize! :index, DocumentReviewOwner.new, @project
    user_ids =
      @project.members.where(dms_module_access: true).pluck(:user_id).compact
    @users = User.where(id: user_ids)
    render formats: :json
  end

  private

  def document_review_owner_params
    # the review owner is set on Contractor level only. This means that the
    # DMS Master set only AAA-STX for review owner. This means that
    # the review owner automatically gets full access rights for all documents
    # of this Contractor.
    # Contractor means the second 3 letters in the file code.
    # In the example above it is „STX“. (c) Yasser
    params.require(:document_review_owner).permit(:user_id,
                                                  :project_id,
                                                  :originating_company)
  end
end
