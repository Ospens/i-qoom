class Api::V1::DocumentsController < ApplicationController
  include ActiveStorage::SendZip
  include PdfRender

  load_resource :project
  load_resource :document, only: [ :edit,
                                   :update,
                                   :show,
                                   :create_revision,
                                   :download_native_file,
                                   :download_details ]
  load_resource :document, through: :project, only: [ :new, :create ]
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
    document = rev.versions.new(document_params.merge(project_id: @project.id))
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
    document = @document.revision.versions.new(document_params.merge(project_id: project.id))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end
  # creates new revision
  def create_revision
    authorize! :edit, @document
    main = @document.revision.document_main
    rev = main.revisions.create
    document = rev.versions.new(document_params.merge(project_id: main.project.id))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def index
    documents =
      if @project.document_mains.any?
        @project.document_mains.documents_available_for(signed_in_user)
      else
        []
      end

    if params[:originating_companies].present? && params[:originating_companies].any?
      documents = documents.filter_by_codification_kind_and_value(:originating_company, params[:originating_companies])
    end

    if params[:discipline].present? && params[:discipline].any?
      documents = documents.filter_by_codification_kind_and_value(:discipline, params[:discipline])
    end

    if params[:document_types].present? && params[:document_types].any?
      documents = documents.filter_by_codification_kind_and_value(:document_type, params[:document_types])
    end

    documents = documents.as_json(include: { document_fields: { include: :document_field_values } })

    document_fields = @project.conventions.active.document_fields
    originating_companies =
      document_fields.find_by(codification_kind: :originating_company)
                     .document_field_values.pluck(:value)
    discipline =
      document_fields.find_by(codification_kind: :discipline)
                     .document_field_values.pluck(:value)
    document_type =
      document_fields.find_by(codification_kind: :document_type)
                     .document_field_values.pluck(:value)

    render json: { documents: documents,
                   originating_companies: originating_companies,
                   discipline: discipline,
                   document_types: document_type }
  end

  def show
    render json: @document.attributes_for_show
  end

  def download_native_file
    file = @document.native_file
    filename =
      "#{@document.codification_string}#{file.filename.extension_with_delimiter}"
    send_data(file.download, filename: filename, disposition: 'attachment')
  end

  def download_details
    send_data document_render(@document),
              filename: "#{@document.codification_string}.pdf",
              type: 'application/pdf',
              disposition: 'attachment'
  end

  def download_native_files
    documents =
      @project.document_mains
              .documents_available_for(signed_in_user)
              .select{ |i| params[:document_ids].include?(i.id.to_s) }
    files = []
    documents.each do |doc|
      file = doc.native_file
      file.filename =
        "#{doc.codification_string}#{file.filename.extension_with_delimiter}"
      files << file
    end
    send_zip(files, filename: "#{@project.name.underscore}.zip")
  end

  def download_list
    documents =
      @project.document_mains
              .documents_available_for(signed_in_user)
              .select{ |i| params[:document_ids].include?(i.id.to_s) }
    documents = Document.where(id: documents.map(&:id))

    filename = "documents_#{Time.now.strftime('%Y-%m-%d_%H-%M-%S')}"

    respond_to do |format|
      format.csv do
        stream = documents.to_csv
        send_data(stream, type: 'text/csv', filename: "#{filename}.csv")
      end
      format.xlsx do
        stream = documents.to_xlsx
        send_data(stream, type: 'application/xlsx', filename: "#{filename}.xlsx")
      end
      format.xml do
        stream = render_to_string
        send_data(stream, type: 'text/xml', filename: "#{filename}.xml")
      end
      format.pdf do
        stream = render_to_string
        send_data(stream, type: 'application/pdf', filename: "#{filename}.pdf")
      end
    end
  end

  private

  def document_params
    params.require(:document).permit(:issued_for,
                                     :email_title,
                                     :email_title_like_document,
                                     :email_text,
                                     document_fields_attributes:
                                      [ :kind,
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
                                          :value,
                                          :title,
                                          :selected,
                                          :position
                                        ]
                                      ]).merge(user: signed_in_user)
  end
end
