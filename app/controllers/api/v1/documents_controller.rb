class Api::V1::DocumentsController < ApplicationController
  load_and_authorize_resource

  before_action :set_project, only: [:new, :create, :index]

  def new
    convention = @project.conventions.find_by(number: 1)
    document = Document.build_from_convention(convention, signed_in_user)
    render json: document
  end

  def create
    document = @project.documents.new(document_params.merge(user: signed_in_user))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: @document.attributes_for_edit
  end

  def update
    if @document.update(document_params)
      render json: @document.attributes_for_edit
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: @project.documents, include: :document_fields
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def document_params
    params.require(:document).permit(:issued_for,
                                     :email_title,
                                     :email_title_like_document,
                                     :email_text,
                                     document_fields_attributes:
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
                                        document_field_values_attributes: [
                                          :id,
                                          :value,
                                          :title,
                                          :position
                                        ]
                                      ])
  end
end
