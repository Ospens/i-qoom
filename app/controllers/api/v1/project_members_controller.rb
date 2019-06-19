class Api::V1::ProjectMembersController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :project_member, through: :project

  def index
    render json: @project.project_members,
                 each_serializer: ProjectMemberSerializer,
           status: :ok
  end

  def new
    render json: { company_types: ProjectMember.company_types,
                   employment_types: ProjectMember.employment_types },
           status: :ok
  end

  def create
    if @project_member.save
      render json: { status: "success",
                     message: t(".success_message"),
                     project_member: ActiveModel::Serializer::CollectionSerializer.new([@project_member],
                                         serializer: ProjectMemberSerializer) },
             status: :created
    else
      error(@project_member)
    end
  end

  def update
    if @project_member.update
      render json: { status: "success",
                     message: t(".success_message"),
                     project_member: ActiveModel::Serializer::CollectionSerializer.new([@project_member],
                                         serializer: ProjectMemberSerializer) },
             status: :created
    else
      error(@project_member)
    end
  end

  private

  def project_member_params
    params.fetch(:project_member,
                 { }).permit(:creation_step,
                             :employment_type,
                             :email)
  end

end