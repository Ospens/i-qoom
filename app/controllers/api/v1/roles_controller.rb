class Api::V1::RolesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :role,
                              through: :project
  def index
    render json: @project.roles,
                 each_serializer: RoleSerializer,
           status: :ok
  end

  def edit
    render json: @role,
                 serializer: RoleSerializer,
           status: :ok
  end

  def create
    if @role.save
      render json: { status: "success",
                     message: t(".success_message"),
                     role: ActiveModel::Serializer::CollectionSerializer.new([@role],
                                         serializer: RoleSerializer) },
             status: :created
    else
      error(@role)
    end
  end

  def update
    if @role.update(role_params)
      render json: { status: "success",
                     message: t(".success_message"),
                     role: ActiveModel::Serializer::CollectionSerializer.new([@role],
                                         serializer: RoleSerializer) },
             status: :created
    else
      error(@role)
    end
  end

  def destroy
    @role.destroy
    head :no_content
  end

  private

  def role_params
    params.fetch(:role, { }).permit(:name)
  end
end