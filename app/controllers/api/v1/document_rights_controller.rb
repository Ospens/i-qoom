class Api::V1::DocumentRightsController < ApplicationController
  load_resource :project, id_param: :project_id
  before_action :authorize_project

  def new
    render json: DocumentRight.attributes_for_edit(@project, true)
  end

  def edit
    render json: DocumentRight.attributes_for_edit(@project)
  end

  def update
    users_params(true)[:users].each do |user_params|
      user = User.find(user_params[:id])
      user.update(user_params.except(:id).merge(accept_terms_and_conditions: true))
    end
    head 200
  end

  private

  def authorize_project
    authorize! :manage, @project
  end

  def users_params(assign_attrs = false)
    if assign_attrs
      params[:users].each do |user_params|
        user_params[:document_rights_attributes] =
          user_params.delete(:document_rights)
      end
    end
    params.permit(users: [
                    :id,
                    document_rights_attributes: [
                      :id,
                      :document_field_id,
                      :document_field_value_id,
                      :enabled,
                      :view_only
                    ]
                  ])
  end
end
