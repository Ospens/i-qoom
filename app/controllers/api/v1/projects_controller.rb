class Api::V1::ProjectsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: signed_in_user.projects
  end

  def show
    render json: @project
  end

  # the first step of creating the project
  # is "create" method,
  # the other steps are "update" method
  # on the create step you don't need to send anything
  # and on admins step it is better to have request like this:
  # { "project" :
  #   { "admins":
  #     {
  #       "id": "#{project.id}",
  #       "email": "someemailaddress@gmail.com"
  #     }
  #   }
  # }
  # Also when the project creation_step is not done
  # it is mandatory to send :creation_step with a value,
  # to apply the correspondent validations

  # "same_for_billing_address" checkbox case
  # if this checkbox is checked company address will be copied
  # to billing address

  def create
    if @project.save
      render json: @project

    else
      render json: @project.errors,
             status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params.merge(admins_inviter_id: signed_in_user.id))
      render json: @project
    else
      render json: @project.errors,
             status: :unprocessable_entity
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
      head :ok
    else
      render json: project_admin_confirmation.errors,
             status: :unprocessable_entity
    end
  end

  def invite
    if @project.invite_members(params[:project_member_ids], signed_in_user.id)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def confirm_member
    project_member_confirmation =
      ProjectMemberConfirmation.new(token: params[:token],
                                    signed_in_user: signed_in_user)
    if project_member_confirmation.save
      head :ok
    else
      render json: project_member_confirmation.errors,
             status: :unprocessable_entity
    end
  end

  def update_project_code
    if @project.update(project_code: params[:project_code])
      head :ok
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private

  def project_params
    if params[:project][:admins].present?
      params[:project][:admins_attributes] =
        params[:project][:admins]
      params[:project].delete(:admins)
    end
    if params[:project][:company_data].present?
      params[:project][:company_data][:company_address_attributes] =
        params[:project][:company_data][:company_address]
      params[:project][:company_data].delete(:company_address)
      params[:project][:company_data][:billing_address_attributes] =
        params[:project][:company_data][:billing_address]
      params[:project][:company_data].delete(:billing_address)
      params[:project][:company_data_attributes] =
        params[:project][:company_data]
      params[:project].delete(:company_data)
    end
    params.fetch(:project,
                 { }).permit(:name,
                             :creation_step,
                             :status,
                             :start_date,
                             :archived,
                             admins_attributes: [
                               :id,
                               :username,
                               :first_name,
                               :last_name,
                               :email,
                               :phone_code,
                               :phone_number
                             ],
                             company_data_attributes: [
                               :logo,
                               :registration_number,
                               :vat_id,
                               :same_for_billing_address,
                               company_address_attributes: Address.column_names,
                               billing_address_attributes: Address.column_names
                             ])
  end
end
