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
    render json: DocumentRight.attributes_for_teams(@project)
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

  def teams_params(assign_attrs = false)
    if assign_attrs
      params[:teams].each do |user_params|
        user_params[:document_rights_attributes] =
          user_params.delete(:document_rights)
      end
    end
    params.permit(users: [
                    :id,
                    document_rights_attributes: [
                      :id,
                      :document_field_id,
                      :document_field_value_id,
                      :enabled,
                      :view_only
                    ]
                  ])
  end
end
