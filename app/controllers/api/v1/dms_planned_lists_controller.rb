class Api::V1::DmsPlannedListsController < ApplicationController
  include DocumentConcern
  load_resource :project, id_param: :project_id
  load_and_authorize_resource :dms_planned_list, except: [:create, :index]

  def create
    authorize! :create, DmsPlannedList.new, @project
    dms_planned_list = @project.dms_planned_lists.new(dms_planned_list_params)
    if dms_planned_list.save
      render json: dms_planned_list
    else
      render json: dms_planned_list.errors,
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
    lists =
      if @project.dms_master?(signed_in_user)
        @project.dms_planned_lists
      else
        @project.dms_planned_lists
                .joins(:users)
                .where(users: { id: signed_in_user.id })
      end
    render json: lists.as_json(only: [:id, :name])
  end

  def update_users
    @dms_planned_list.users = []
    params[:users].each do |user_id|
      @dms_planned_list.users << User.find(user_id)
    end
    head 200
  end

  def edit_documents
    result = { document_mains: [], new: {}, name: @dms_planned_list.name }
    result[:new] =
      Document.build_from_convention(@project.conventions.active, signed_in_user)
    @dms_planned_list.document_mains.order(position: :asc).each do |main|
      main_attrs = main.as_json(only: [:id, :position, :planned])
      document = main.revisions.last_revision.last_version
      main_attrs[:document] =
        main.revisions.last_revision.last_version.attributes_for_edit
      result[:document_mains] << main_attrs
    end
    render json: result
  end

  def update_documents
    result = { document_mains: [], new: {} }
    result[:new] =
      Document.build_from_convention(@project.conventions.active, signed_in_user)
    # temp_id is used for detecting errors
    params[:document_mains].each do |main_params|
      result_main = {}
      if main_params[:temp_id].present?
        result_main[:temp_id] = main_params[:temp_id]
      end
      main = DocumentMain.find_by(id: main_params[:id])
      if main.present?
        next if !@dms_planned_list.document_mains.include?(main)
        if main_params['_destroy'] == '1'
          main.destroy
          next
        end
        document = main.revisions.last_revision.last_version
        new_document =
          document.revision
                  .versions
                  .new(document_params(main_params[:document], true))
        if !new_document.save
          result_main[:errors] = new_document.errors
        end
        result_main[:document] = new_document.attributes_for_edit
      else
        main = @project.document_mains
                       .create(planned: true, position: main_params[:position])
        rev = main.revisions.create
        document = rev.versions.new(document_params(main_params[:document], true))
        if document.save
          if !@dms_planned_list.document_mains.include?(main)
            @dms_planned_list.document_mains << main
          end
        else
          result_main[:errors] = document.errors
          main.destroy
        end
        result_main[:document] = document.attributes_for_edit
      end
      result[:document_mains] << result_main
    end
    render json: result
  end

  private

  def dms_planned_list_params
    params.require(:dms_planned_list).permit(:name)
  end

  def document_params(attrs, assign_attrs = false)
    common_document_params(attrs, assign_attrs, signed_in_user)
  end
end
