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

  authorize_resource :document, except: [ :new,
                                          :create,
                                          :index,
                                          :download_native_files,
                                          :download_list,
                                          :my_documents ]

  before_action :authorize_collection_actions, only: [ :index,
                                                       :download_native_files,
                                                       :download_list,
                                                       :my_documents ]

  def new
    authorize! :new, Document.new, @project
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
    authorize! :create, Document.new, @project
    if params[:planned] == 'true'
      authorize! :create_planned, Document.new, @project
    end
    main = @project.document_mains.create(planned: params[:planned] == 'true')
    rev = main.revisions.create
    document = rev.versions.new(document_params(true))
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
    document = @document.revision.versions.new(document_params(true))
    if document.save
      render json: document.attributes_for_edit
    else
      render json: document.errors, status: :unprocessable_entity
    end
  end
  # creates new revision
  def create_revision
    authorize! :edit, @document
    main = @document.document_main
    rev = main.revisions.create
    document = rev.versions.new(document_params(true))
    if document.save
      render json: document.attributes_for_edit
    else
      rev.destroy
      render json: document.errors, status: :unprocessable_entity
    end
  end

  def index
    documents = @project.document_mains.documents_available_for(signed_in_user)
    documents_not_filtered = documents
    # If we add to filters fields like "document number" then under this filter
    # could be hundreds of selections. Is this acceptable?
    # > i agree. Filters like document number or revision number are not needed
    # (c) Yasser
    # Filters are not working properly. For example on "Originating companies":
    # As default all boxes are ticked for available companies (there are two:
    # General Electric and SIEMENS). If i untick SIEMENS, then only documents
    # with General Electric appears.
    # So when i untick all, then no document shall appear.
    # (c) Yasser
    if params[:originating_companies].present? || params[:discipline].present? || params[:document_types].present?
      documents = documents.filter_by_codification_kind_and_value(:originating_company, params[:originating_companies])
      documents = documents.filter_by_codification_kind_and_value(:discipline, params[:discipline])
      documents = documents.filter_by_codification_kind_and_value(:document_type, params[:document_types])
    end
    if params[:filters].present? && params[:filters].any?
      params[:filters].each do |filter|
        documents = documents.filter_by_document_field_title_and_value(filter['title'], filter['value'])
      end
    end
    if params[:document_title].present?
      documents = documents.filter_by_document_title(params[:document_title])
    end
    if params[:doc_id].present?
      documents = documents.filter_by_doc_id(params[:doc_id])
    end
    if params[:search].present?
      documents = documents.search(params[:search])
    end
    documents =
      documents.as_json(include: { document_fields: { include: :document_field_values } })
    # i meant that the filter buttons shall be shown but no content. This way
    # the user knows
    # 1. that filter exists and
    # 2. in case of available documents he can see what can be selected.
    # For example: if he can filter for Siemens, than he knows straight away
    # that there Siemens documents uploaded (c) Yasser
    render json: {
      documents: documents,
      originating_companies: documents_not_filtered.values_for_filters(codification_kind: :originating_company),
      discipline: documents_not_filtered.values_for_filters(codification_kind: :discipline),
      document_types: documents_not_filtered.values_for_filters(codification_kind: :document_type)
    }
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
    render json: @document.document_main.revisions
  end

  def my_documents
    mains = @project.document_mains
    documents = mains.documents_available_for(signed_in_user)
    render json: documents, include: {
      document_fields: { include: :document_field_values }
    }
  end

  def revisions_and_versions
    @main = @document.document_main
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
                                     :contractor,
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
