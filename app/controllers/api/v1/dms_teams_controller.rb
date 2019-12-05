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

  def destroy
    params[:dms_teams].each do |team_id|
      DmsTeam.find_by(id: team_id).destroy
    end
    head 200
  end

  def show
    render json: @dms_team
  end

  def index
    render json: DocumentRight.attributes_for_teams(@project, params[:only_new] == 'true')
  end

  def index_for_documents
    render json: @project.dms_teams.as_json(only: [:id, :name],
                                            include: { users: { only: [:id,
                                                               :first_name,
                                                               :last_name,
                                                               :username,
                                                               :email] } })
  end

  def update_members
    @dms_team.users = []
    params[:users].each do |user|
      @dms_team.users << User.find(user)
    end
    render json: @dms_team
  end

  def update_rights
    teams_params(true)[:teams].each do |team_params|
      team = DmsTeam.find(team_params[:id])
      team.update(team_params.except(:id))
    end
    head 200
  end

  private

  def authorize_project
    authorize! :manage, DmsTeam.new, @project
  end

  def teams_params(assign_attrs = false)
    if assign_attrs
      params[:teams].each do |team_params|
        team_params[:document_rights_attributes] =
          team_params.delete(:document_rights)
      end
    end
    params.permit(teams: [
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
