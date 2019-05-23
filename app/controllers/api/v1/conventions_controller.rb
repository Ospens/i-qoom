class Api::V1::ConventionsController < ApplicationController
  load_resource :project, id_param: :project_id
  before_action :set_convention
  authorize_resource :convention

  def edit
    if !@convention.document_fields.any?
      @convention.build_default_fields
    end
    render json: @convention.as_json(include: { document_fields: { include: :document_field_values } })
  end

  def update
    if @convention.update(convention_params)
      render json: @convention.as_json(include: { document_fields: { include: :document_field_values } })
    else
      render json: @convention.errors, status: :unprocessable_entity
    end
  end

  private

  def set_convention
    conventions = @project.conventions
    @convention = conventions.active.presence || conventions.new
  end

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
                                          :value,
                                          files: [],
                                          document_field_values_attributes: [
                                            :id,
                                            :value,
                                            :title,
                                            :position
                                          ]
                                        ])
  end
end
