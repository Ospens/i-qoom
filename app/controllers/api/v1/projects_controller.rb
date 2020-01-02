class Api::V1::ProjectsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: signed_in_user.member_projects.creation_step_done
  end

  def show
    render json: @project, user: signed_in_user
  end

  def create
    if @project.save
      render json: @project

    else
      render json: @project.errors,
             status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
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
    if project_member_confirmation.accept
      head :ok
    elsif project_member_confirmation.registration_required?
      render json: {
        project_member: {
          id: project_member_confirmation.project_member.id,
          full_name: project_member_confirmation.project_member.full_name
        }
      },
      status: :not_found
    elsif project_member_confirmation.unauthorized?
      render json: project_member_confirmation.errors,
             status: :unauthorized
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

  def dms_users
    users = @project.dms_users
    if params[:scope] == 'teams'
      ids = @project.dms_teams.pluck(:id)
      users_in_teams = users.joins(:dms_teams).where(dms_teams: { id: ids })
      users = users.where.not(id: users_in_teams.pluck(:id))
    end
    render json: users.as_json(only: [:id,
                                      :first_name,
                                      :last_name,
                                      :username])
  end

  private

  def project_params
    if params[:project][:company_data].present?
      if params[:project][:company_data][:company_address].present?
        params[:project][:company_data][:company_address_attributes] =
          params[:project][:company_data][:company_address]
        params[:project][:company_data].delete(:company_address)
      end
      if params[:project][:company_data][:billing_address].present?
        params[:project][:company_data][:billing_address_attributes] =
          params[:project][:company_data][:billing_address]
        params[:project][:company_data].delete(:billing_address)
      end
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
                             company_data_attributes: [
                               :logo,
                               :remove_logo,
                               :registration_number,
                               :vat_id,
                               :same_for_billing_address,
                               company_address_attributes: Address.column_names,
                               billing_address_attributes: Address.column_names
                             ])
  end
end
