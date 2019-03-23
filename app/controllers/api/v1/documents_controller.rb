class Api::V1::DocumentsController < ApplicationController
  before_action :set_document, only: [ :edit, :update ]

  def new
    convention = Convention.first_or_create(number: 1)
    document = Document.build_from_convention(convention)
    render json: document, include: :document_fields
  end

  def create
    document = Document.new(document_params)
    if document.save
      render json: document, include: :document_fields
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: @document, include: :document_fields
  end

  def update
    if @document.update(document_params)
      render json: @document, include: :document_fields
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: Document.all, include: :document_fields
  end

  private

  def set_document
    @document = Document.find(params[:id])
  end

  def document_params
    params.require(:document).permit(:issued_for,
                                     :native_file,
                                     :other_files,
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
                                        :value ])
  end
end
