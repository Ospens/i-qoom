class Api::V1::ProjectMembersController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :project_member,
                              through: :project,
                              through_association: :members

  def active
    render json: { disciplines: ActiveModel::Serializer::CollectionSerializer.new(@project.disciplines,
                                serializer: DisciplineSerializer),
                   roles: ActiveModel::Serializer::CollectionSerializer.new(@project.roles,
                              serializer: RoleSerializer),
                   members: ActiveModel::Serializer::CollectionSerializer.new(@project.members.creation_step_active,
                              serializer: ProjectMemberSerializer) },
           status: :ok
  end

  def pending
    render json: { disciplines: ActiveModel::Serializer::CollectionSerializer.new(@project.disciplines,
                              serializer: DisciplineSerializer),
                   roles: ActiveModel::Serializer::CollectionSerializer.new(@project.roles,
                              serializer: RoleSerializer),
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
      render json: @project_member,
             status: :created
    else
      render json: @project_member.errors,
             status: :unprocessable_entity
    end
  end

  def update
    if @project_member.update(project_member_params)
      render json: @project_member,
             status: :ok
    else
      render json: @project_member.errors,
             status: :unprocessable_entity
    end
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
                             :cms_modul_access,
                             :dms_modul_access,
                             :cms_modul_master,
                             :dms_modul_master,
                             company_address_attributes: Address.column_names)
  end
end