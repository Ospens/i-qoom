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

  # the first step of creating the project and adding an admin
  # is "create" method,
  # the other steps are "update" method
  # and on admins step it is better to have request like this:
  # { "project" :
  #   { "admins_attributes":
  #     {
  #       "id": "",
  #       "email": "someemailaddress@gmail.com"
  #     }
  #   }
  # } 
  # Also in case the project creation_step is not done,
  # it is mandatory to send :creation_step with a value,
  # to apply the correspondent validations


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
    params.fetch(:project, { }).permit(:name,
                                       :creation_step,
                                       admins_attributes: [
                                         :id,
                                         :username,
                                         :first_name,
                                         :last_name,
                                         :email,
                                         :phone_code,
                                         :phone_number
                                          ])
  end
end
