class Api::V1::DisciplinesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :discipline,
                              through: :project
  def index
    render json: @project.disciplines,
                 each_serializer: DisciplineSerializer,
           status: :ok
  end

  def edit
    render json: @discipline,
                 serializer: DisciplineSerializer,
           status: :ok
  end

  def create
    if @discipline.save
      render json: { status: "success",
                     message: t(".success_message"),
                     discipline: ActiveModel::Serializer::CollectionSerializer.new([@discipline],
                                         serializer: DisciplineSerializer) },
             status: :created
    else
      error(@discipline)
    end
  end

  def update
    if @discipline.update(discipline_params)
      render json: { status: "success",
                     message: t(".success_message"),
                     discipline: ActiveModel::Serializer::CollectionSerializer.new([@discipline],
                                         serializer: DisciplineSerializer) },
             status: :created
    else
      error(@discipline)
    end
  end

  def destroy
    @discipline.destroy
    head :no_content
  end

  private

  def discipline_params
    params.fetch(:discipline, { }).permit(:name)
  end
end