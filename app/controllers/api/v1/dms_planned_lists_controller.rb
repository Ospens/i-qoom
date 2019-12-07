class Api::V1::DmsPlannedListsController < ApplicationController
  include DocumentConcern
  load_resource :project, id_param: :project_id
  load_and_authorize_resource :dms_planned_list, except: :create

  def create
    authorize! :create, DmsPlannedList.new, @project
    @project.dms_planned_lists.create(dms_planned_list_params)
    head 200
  end

  def update
    @dms_planned_list.update(dms_planned_list_params)
    head 200
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
      main_attrs = main.as_json(only: [:id, :position])
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
