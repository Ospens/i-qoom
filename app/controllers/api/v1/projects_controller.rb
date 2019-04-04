class Api::V1::ProjectsController < ApplicationController
  load_and_authorize_resource
  
  def index
    @projects = signed_in_user.projects
    render json: { location: @projects },
           status: :ok
  end

  def show
    render json: { location: @project },
           status: :ok
  end

  def create
    @project = signed_in_user.projects.new(project_params)
    if @project.save
      success(:created)
    else
      error(@project)
    end
  end

  def update
    if @project.update(project_params)
      success(:created)
    else
      error(@project)
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.fetch(:project, { }).permit(:name)
  end
end
