class Api::V1::ProjectMembersController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :project_member,
                              through: :project,
                              through_association: :members

  def active
    render json: { disciplines: @project.disciplines,
                   roles: @project.roles,
                   members: ActiveModel::Serializer::CollectionSerializer.new(@project.members.creation_step_active,
                              serializer: ProjectMemberSerializer) },
           status: :ok
  end

  def pending
    render json: { disciplines: @project.disciplines,
                   roles: @project.roles,
                   members: ActiveModel::Serializer::CollectionSerializer.new(@project.members.creation_step_pending,
                              serializer: ProjectMemberSerializer) },
           status: :ok
  end

  def new
    render json: { company_types:
                     enum_keys_with_titles(ProjectMember.company_types),
                   employment_types:
                     enum_keys_with_titles(ProjectMember.employment_types) },
           status: :ok
  end

  def create
    if @project_member.save
      render json: ActiveModel::Serializer::CollectionSerializer.new([@project_member],
                                         serializer: ProjectMemberSerializer),
             status: :created
    else
      render json: @project_member.errors,
             status: :unprocessable_entity
    end
  end

  def update   
    if @project_member.update(project_member_params)
      render json: ActiveModel::Serializer::CollectionSerializer.new([@project_member],
                                         serializer: ProjectMemberSerializer),
             status: :created
    else
      render json: @project_member.errors,
             status: :unprocessable_entity
    end
  end

  def invite
    #ProjectMember.invite(params[project_member_ids])
  end

  private

  def project_member_params
    params[:project_member][:company_address_attributes] =
      params[:project_member][:company_address]
    params[:project_member].delete(:company_address)
    params.fetch(:project_member,
                 { }).permit(:creation_step,
                             :employment_type,
                             :company_type,
                             :email,
                             :first_name,
                             :last_name,
                             :phone_code,
                             :phone_number,
                             :job_title,
                             :discipline_id,
                             :role_id,
                             company_address_attributes: Address.column_names)
  end
end