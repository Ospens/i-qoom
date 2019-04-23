class Api::V1::DocumentsController < ApplicationController
  load_resource :project
  load_resource :document, only: [:edit, :update]
  load_resource :document, only: [:create_revision], id_param: :document_id
  load_resource :document, through: :project, except: [:edit, :update, :create_revision]
  authorize_resource :document

  def new
    convention = @project.conventions.active
    document = Document.build_from_convention(convention, signed_in_user)
    render json: document
  end
  # creates new fresh document
  def create
    main = @project.document_mains.create
    rev = main.revisions.create
    document = rev.versions.new(document_params.merge(user: signed_in_user, project: @project))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: @document.attributes_for_edit
  end
  # creates new revision version
  def update
    project = @document.revision.document_main.project
    document = @document.revision.versions.new(document_params.merge(user: signed_in_user, project: project))
    if document.save
      render json: @document.attributes_for_edit
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end
  # creates new revision
  def create_revision
    main = @document.revision.document_main
    rev = main.revisions.create
    document = rev.versions.new(document_params.merge(user: signed_in_user, project: main.project))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: @project.documents, include: :document_fields
  end

  private

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
