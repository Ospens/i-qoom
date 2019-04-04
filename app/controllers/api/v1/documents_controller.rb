class Api::V1::DocumentsController < ApplicationController
  load_and_authorize_resource

  def new
    convention = Convention.first_or_create(number: 1)
    convention.build_default_fields
    convention.document_fields.each do |field|
      field.document_field_values.new(value: Faker::Name.initials(3), position: 1)
    end
    document = Document.build_from_convention(convention, signed_in_user)
    render json: document
  end

  def create
    document = signed_in_user.documents.new(document_params)
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
    render json: Document.all, include: :document_fields
  end

  private

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
