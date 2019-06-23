class Api::V1::ProjectAdministratorsController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :project_administrator,
                              through: :project,
                              through_association: :admins

  # inspect
  def show
    render json: @project_administrator,
                 serializer: ProjectAdministratorSerializer,
           status: :ok
  end

  def index
    render json: @project.admins,
                 each_serializer: ProjectAdministratorSerializer,
           status: :ok
  end

  def resend_confirmation
    @project_administrator.send_confirmation_email
    success(:ok)
  end

  def destroy
    if @project_administrator.remove
      success(:ok)
    else
      error(@project_administrator)
    end
  end

end