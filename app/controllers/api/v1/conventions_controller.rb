class Api::V1::ConventionsController < ApplicationController
  load_and_authorize_resource

  def edit
    if !@convention.document_fields.any?
      @convention.build_default_fields
    end
    render json: @convention, include: :document_fields
  end

  def update
    if @convention.update(convention_params)
      render json: @convention, include: :document_fields
    else
      render json: @convention.errors, status: :unprocessable_entity
    end
  end

  private

  def convention_params
    params.require(:convention).permit(document_fields_attributes:
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
