class Api::V1::DmsPlannedListsController < ApplicationController
  include DocumentConcern
  load_resource :project, id_param: :project_id
  load_and_authorize_resource :dms_planned_list, except: [:create, :index]

  def create
    authorize! :create, DmsPlannedList.new, @project
    @project.dms_planned_lists.create(dms_planned_list_params)

    dms_planned_lists = @project.dms_planned_lists.create(dms_planned_list_params)
    if dms_planned_lists.save
      render json: dms_planned_lists
    else
      render json: dms_planned_lists.errors,
             status: :unprocessable_entity
    end
  end

  def update
    if @dms_planned_list.update(dms_planned_list_params)
      render json: @dms_planned_list
    else
      render json: @dms_planned_list.errors, status: :unprocessable_entity
    end
  end

  def show
    documents = { name: @dms_planned_list.name, documents: [] }
    @dms_planned_list.document_mains.order(position: :asc).each do |main|
      document = main.revisions.last_revision.last_version
      documents[:documents] << document.as_json(include: { document_fields: { include: :document_field_values } })
    end
    render json: documents
  end

  def index
    authorize! :index, DmsPlannedList.new, @project
    render json: @project.dms_planned_lists
                         .joins(:users)
                         .where(users: { id: signed_in_user.id })
                         .as_json(only: [:id, :name])
  end

  def update_users
    @dms_planned_list.users = []
    params[:users].each do |user_id|
      @dms_planned_list.users << User.find(user_id)
    end
    head 200
  end

  def edit_documents
    result = { document_mains: [], new: {} }
    result[:new] =
      Document.build_from_convention(@project.conventions.active, signed_in_user)
    @dms_planned_list.document_mains.order(position: :asc).each do |main|
      main_attrs = main.as_json(only: [:id, :position, :planned])
      document = main.revisions.last_revision.last_version
      main_attrs[:document] =
        main.revisions.last_revision.last_version.attributes_for_edit
      main_attrs[:edit] =
        Document.build_from_convention(document.convention, signed_in_user)
      result[:document_mains] << main_attrs
    end
    render json: result
  end

  def update_documents
    params[:document_mains].each do |main_params|
      main = DocumentMain.find_by(id: main_params[:id])
      if main.present?
        next if !@dms_planned_list.document_mains.include?(main)
        document = main.revisions.last_revision.last_version
        document.revision.versions.create(document_params(main_params[:document], true))
      else
        main = @project.document_mains.create(planned: true, position: main_params[:position])
        rev = main.revisions.create
        document = rev.versions.create(document_params(main_params[:document], true))
        if !@dms_planned_list.document_mains.include?(main)
          @dms_planned_list.document_mains << main
        end
      end
    end
  end

  private

  def dms_planned_list_params
    params.require(:dms_planned_list).permit(:name)
  end

  def document_params(attrs, assign_attrs = false)
    common_document_params(attrs, assign_attrs, signed_in_user)
  end
end
