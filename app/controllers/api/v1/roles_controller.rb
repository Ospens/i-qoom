class Api::V1::RolesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :role,
                              through: :project
  def index
    render json: @project.roles.order(title: :asc)
  end

  def edit
    render json: @role
  end

  def create
    if @role.save
      render json: @role,
             status: :created
    else
      render json: @role.errors,
             status: :unprocessable_entity
    end
  end

  def update
    if @role.update(role_params)
      render json: @role
    else
      render json: @role.errors,
             status: :unprocessable_entity
    end
  end

  def destroy
    @role.destroy
    head :no_content
  end

  private

  def role_params
    params.fetch(:role, { }).permit(:title)
  end
end