class Api::V1::ProjectAdministratorsController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :project_administrator,
                              through: :project,
                              through_association: :admins

  # inspect
  def show
    render json: @project_administrator,
           status: :ok
  end

  def index
    render json: @project.admins.order(id: :asc),
           status: :ok
  end

  def resend_confirmation
    @project_administrator.send_confirmation_email
    head :ok
  end

  def destroy
    if @project_administrator.remove
      head :ok
    else
      render json: @project_administrator.errors,
             status: :unprocessable_entity
    end
  end

end