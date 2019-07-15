class Api::V1::ConventionsController < ApplicationController
  load_resource :project, id_param: :project_id
  before_action :set_convention, only: :edit
  authorize_resource :convention

  def edit
    if !@convention.document_fields.any?
      @convention.build_default_fields
    end
    render json: @convention.attributes_for_edit
  end

  def update
    @convention = @project.conventions.new(convention_params(true).merge(number: 1))
    if @convention.save
      render json: @convention.attributes_for_edit
    else
      render json: @convention.errors, status: :unprocessable_entity
    end
  end

  private

  def set_convention
    conventions = @project.conventions
    @convention = conventions.active.presence || conventions.new
  end

  def convention_params(assign_attrs = false)
    if assign_attrs
      params[:convention][:document_fields_attributes] =
        params[:convention].delete(:document_fields)
      params[:convention][:document_fields_attributes].each do |field|
        next if field[:document_field_values].blank?
        field[:document_field_values_attributes] = field.delete(:document_field_values)
      end
    end
    params.require(:convention).permit(document_fields_attributes:
                                        [ :kind,
                                          :codification_kind,
                                          :column,
                                          :row,
                                          :required,
                                          :multiselect,
                                          :title,
                                          :command,
                                          document_field_values_attributes: [
                                            :value,
                                            :title,
                                            :position
                                          ]
                                        ])
  end
end
