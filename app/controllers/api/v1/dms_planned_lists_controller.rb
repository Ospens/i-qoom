class Api::V1::DmsPlannedListsController < ApplicationController
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

  private

  def dms_planned_list_params
    params.require(:dms_planned_list).permit(:name)
  end
end
