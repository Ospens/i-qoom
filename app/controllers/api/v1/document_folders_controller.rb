class Api::V1::DocumentFoldersController < ApplicationController
  load_and_authorize_resource

  def create
    document_folder = signed_in_user.document_folders.new(document_folder_params(true))
    if document_folder.save
      render json: document_folder, include: :document_fields
    else
      render json: document_folder.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: @document_folder, include: :document_fields
  end

  def update
    if @document_folder.update(document_folder_params(true))
      render json: @document_folder, include: :document_fields
    else
      render json: @document_folder.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @document_folder.all_documents, include: { document_fields: { include: :document_field_values } }
  end

  def add_document_to_folders
    document = Document.find(params[:document_id])
    params[:document_folder_ids].each do |folder_id|
      folder = DocumentFolder.find(folder_id)
      if folder.allowed_to_add_document?(document, signed_in_user)
        folder.documents << document
      end
    end
    success(200)
  end

  private

  def document_folder_params(assign_attrs = false)
    if assign_attrs
      params[:document_folder][:document_fields_attributes] =
        params[:document_folder].delete(:document_fields)
    end
    params.require(:document_folder).permit(:title,
                                            :project_id,
                                             document_fields_attributes:
                                              [ :id,
                                                :kind,
                                                :codification_kind,
                                                :value ])
  end
end
