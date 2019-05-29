class Api::V1::ProjectsController < ApplicationController
  load_and_authorize_resource
  
  def index
    @projects = signed_in_user.projects
    render json: @projects,
                 each_serializer: ProjectSerializer,
           status: :ok
  end

  def show
    render json: @project,
                 serializer: ProjectSerializer,
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

  # "same_for_billing_address" checkbox case
  # if this checkbox is checked company address will be copied
  # to billing address

  def create
    @project = signed_in_user.projects.new(project_params)
    if @project.save
      render json: { status: "success",
                     message: t(".success_message"),
                     project: ActiveModel::Serializer::CollectionSerializer.new([@project],
                                         serializer: ProjectSerializer) },
             status: :created
    else
      error(@project)
    end
  end

  def update
    if @project.update(project_params)
      render json: { status: "success",
                     message: t(".success_message"),
                     project: ActiveModel::Serializer::CollectionSerializer.new([@project],
                                         serializer: ProjectSerializer) },
             status: :created
    else
      error(@project)
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  # if user is not logged in, on frontend side he is supposed to be
  # redirected to the login page, and after log in this action
  # must be run again to confirm his account as an admin
  def confirm_admin
    project_admin_confirmation =
      ProjectAdministratorConfirmation.new(token: params[:token],
                                    signed_in_user: signed_in_user)
    if project_admin_confirmation.save
      success(:created)
    else
      error(project_admin_confirmation)
    end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.fetch(:project,
                 { }).permit(:name,
                             :creation_step,
                             admins_attributes: [
                               :id,
                               :username,
                               :first_name,
                               :last_name,
                               :email,
                               :phone_code,
                               :phone_number
                             ],
                             company_datum_attributes: [
                               :logo,
                               :registration_number,
                               :vat_id,
                               :same_for_billing_address,
                               company_address_attributes: Address.column_names,
                               billing_address_attributes: Address.column_names
                             ])
  end
end
