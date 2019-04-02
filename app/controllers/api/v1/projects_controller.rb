class Api::V1::ProjectsController < ApplicationController
  load_and_authorize_resource

  def index
    @projects = Project.all
  end

  def show
  end

  def create
    @project = Project.new(project_params)
    created_or_update(@project.save)
  end

  def update
    created_or_update(@project.update(project_params))
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
    params.fetch(:project, {})
  end
end
