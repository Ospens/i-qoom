class Api::V1::DmsTeamsController < ApplicationController
  load_resource :project
  load_resource
  before_action :authorize_project

  def create
    team = DmsTeam.create(project: @project, name: params[:name])
    render json: team
  end

  def update
    @dms_team.update(name: params[:name])
    render json: @dms_team
  end

  def show
    render json: @dms_team
  end

  def index
    render json: @project.dms_teams
  end

  def update_members
    @dms_team.users = []
    params[:users].each do |user|
      @dms_team.users << User.find(user)
    end
    render json: @dms_team
  end

  def update_rights
  end

  private

  def authorize_project
    authorize! :manage, DmsTeam.new, @project
  end
end
