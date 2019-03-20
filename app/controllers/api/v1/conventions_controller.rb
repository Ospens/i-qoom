class Api::V1::ConventionsController < ApplicationController
  before_action :set_convention

  def edit
    render json: @convention, include: :convention_fields
  end

  def update
    if @convention.update(convention_params)
      render json: @convention, include: :convention_fields
    else
      render json: @convention.errors, status: :unprocessable_entity
    end
  end

  private

  def set_convention
    @convention = Convention.find(params[:id])
  end

  def convention_params
    params.require(:convention).permit(convention_fields_attributes:
                                        [ :id,
                                          :kind,
                                          :codification_kind,
                                          :column,
                                          :row,
                                          :required,
                                          :multiselect,
                                          :title,
                                          :command,
                                          :value ])
  end
end
