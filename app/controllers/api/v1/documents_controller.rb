class Api::V1::DocumentsController < ApplicationController
  include ActiveStorage::SendZip
  include PdfRender

  load_resource :project
  load_resource :document, only: [ :edit,
                                   :update,
                                   :show,
                                   :create_revision,
                                   :download_native_file,
                                   :download_details,
                                   :revisions,
                                   :revisions_and_versions ]

  load_resource :document, through: :project, only: [ :new, :create ]
  authorize_resource :document, except: [ :index,
                                          :download_native_files,
                                          :download_list,
                                          :my_documents ]
  before_action :authorize_collection_actions, only: [ :index,
                                                       :download_native_files,
                                                       :download_list,
                                                       :my_documents ]

  def new
    convention = @project.conventions.active
    document = Document.build_from_convention(convention, signed_in_user)
    document['review_status_options'] =
      enum_keys_with_titles({ 'issued_for_approval' => '',
                              'issued_for_review' => '',
                              'issued_for_information' => ''})
    render json: document
  end
  # creates new fresh document
  def create
    main = @project.document_mains.create
    rev = main.revisions.create
    document = rev.versions.new(document_params(true).merge(project_id: @project.id))
    if document.save
      render json: document.attributes_for_edit
    else
      rev.destroy
      main.destroy
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: @document.attributes_for_edit
  end
  # creates new revision version
  def update
    project = @document.revision.document_main.project
    document = @document.revision.versions.new(document_params(true).merge(project_id: project.id))
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
    document = rev.versions.new(document_params(true).merge(project_id: main.project.id))
    if document.save
      render json: document.attributes_for_edit
    else
      rev.destroy
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def index
    documents = @project.document_mains.documents_available_for(signed_in_user)

    if params[:originating_companies].present? && params[:originating_companies].any?
      documents = documents.filter_by_codification_kind_and_value(:originating_company, params[:originating_companies])
    end

    if params[:discipline].present? && params[:discipline].any?
      documents = documents.filter_by_codification_kind_and_value(:discipline, params[:discipline])
    end

    if params[:document_types].present? && params[:document_types].any?
      documents = documents.filter_by_codification_kind_and_value(:document_type, params[:document_types])
    end

    documents =
      documents.as_json(include: { document_fields: { include: :document_field_values } },
                        methods: [:codification_string])

    document_fields = @project.conventions.active.document_fields
    originating_companies =
      document_fields.find_by(codification_kind: :originating_company)
                     .document_field_values.pluck(:value, :title)
    discipline =
      document_fields.find_by(codification_kind: :discipline)
                     .document_field_values.pluck(:value, :title)
    document_type =
      document_fields.find_by(codification_kind: :document_type)
                     .document_field_values.pluck(:value, :title)

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
    @documents =
      @project.document_mains
              .documents_available_for(signed_in_user)
              .select{ |i| params[:document_ids].include?(i.id.to_s) }
    @documents = Document.where(id: @documents.map(&:id))

    filename = "documents_#{Time.now.strftime('%Y-%m-%d_%H-%M-%S')}"

    respond_to do |format|
      format.csv do
        stream = @documents.to_csv
        send_data(stream, type: 'text/csv', filename: "#{filename}.csv")
      end
      format.xlsx do
        stream = @documents.to_xlsx
        send_data(stream, type: 'application/xlsx', filename: "#{filename}.xlsx")
      end
      format.xml do
        stream = render_to_string
        send_data(stream, type: 'text/xml', filename: "#{filename}.xml")
      end
      format.pdf do
        stream = document_list_render(@documents)
        send_data(stream, type: 'application/pdf', filename: "#{filename}.pdf")
      end
    end
  end

  def revisions
    render json: @document.revision.document_main.revisions
  end

  def my_documents
    revision_ids = @project.documents.pluck(:document_revision_id).uniq
    revisions = DocumentRevision.find(revision_ids)
    main_ids = revisions.pluck(:document_main_id).uniq
    mains = DocumentMain.where(id: main_ids)
    documents = mains.documents_available_for(signed_in_user)
    render json: documents, include: {
      document_fields: { include: :document_field_values }
    }
  end

  def revisions_and_versions
    @main = @document.revision.document_main
    render formats: :json
  end

  private

  def authorize_collection_actions
    authorize! :collection_actions, Document.new, @project
  end

  def document_params(assign_attrs = false)
    # assign_attrs is used to ensure that document_params is called from action
    # instead of cancancan gem
    if assign_attrs
      params[:document][:document_fields_attributes] = params[:document].delete(:document_fields)
      params[:document][:document_fields_attributes].each do |field|
        next if field[:document_field_values].blank?
        field[:document_field_values_attributes] = field.delete(:document_field_values)
      end
    end
    params.require(:document).permit(:issued_for,
                                     :title,
                                     :review_status,
                                     :email_title,
                                     :email_title_like_document,
                                     :email_text,
                                     emails: [],
                                     reviewers: [],
                                     review_issuers: [],
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
                                        :file,
                                        document_field_values_attributes: [
                                          :value,
                                          :title,
                                          :selected,
                                          :position
                                        ]
                                      ]).merge(user: signed_in_user)
  end
end
