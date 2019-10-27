class Api::V1::ConventionsController < ApplicationController
  include PdfRender
  load_resource :project, id_param: :project_id
  load_and_authorize_resource :convention, only: [:download_codification]
  before_action :set_convention, only: [ :edit, :update ]

  def edit
    authorize! :edit, @convention
    render json: @convention.attributes_for_edit
  end

  def update
    authorize! :update, @convention
    @convention = @project.conventions.new(convention_params(true).merge(number: 1))
    if @convention.save
      render json: @convention.attributes_for_edit
    else
      render json: @convention.errors, status: :unprocessable_entity
    end
  end

  def download_codification
    send_data codification_render(@convention),
              filename: 'project_codification.pdf',
              type: 'application/pdf',
              disposition: 'attachment'
  end

  private

  def set_convention
    @convention = @project.conventions.active
  end

  def assign_suffix(params)
    params[:convention][:document_fields_attributes] =
      params[:convention].delete(:document_fields)
    params[:convention][:document_fields_attributes].each do |field|
      next if field[:document_field_values].blank?
      field[:document_field_values_attributes] = field.delete(:document_field_values)
    end
  end

  def convention_params(assign_attrs = false)
    assign_suffix(params) if assign_attrs
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
