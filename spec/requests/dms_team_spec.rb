require 'rails_helper'

describe DmsTeam, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:user) { FactoryBot.create(:user) }

  context '#create' do
    it 'anon' do
      post "/api/v1/projects/#{project.id}/dms_teams",
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{project.id}/dms_teams",
        headers: credentials(user),
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{project.id}/dms_teams",
        headers: credentials(user),
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      post "/api/v1/projects/#{project.id}/dms_teams",
        headers: credentials(project.user),
        params: { name: '111' }
      expect(response).to have_http_status(:success)
      expect(json['name']).to eql('111')
      expect(DmsTeam.count).to eql(1)
    end
  end

  context '#update' do
    let(:team) { FactoryBot.create(:dms_team) }

    it 'anon' do
      patch "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(user),
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      patch "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(user),
        params: { name: '111' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      patch "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(team.project.user),
        params: { name: '111' }
      expect(response).to have_http_status(:success)
      expect(json['name']).to eql('111')
      expect(DmsTeam.count).to eql(1)
    end
  end

  context '#show' do
    let(:team) { FactoryBot.create(:dms_team) }

    it 'anon' do
      get "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      get "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(team.project.user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('name')
    end
  end

  context '#index' do
    let(:team) { FactoryBot.create(:dms_team) }

    it 'anon' do
      get "/api/v1/projects/#{team.project.id}/dms_teams"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{team.project.id}/dms_teams",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{team.project.id}/dms_teams",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      get "/api/v1/projects/#{team.project.id}/dms_teams",
        headers: credentials(team.project.user)
      expect(response).to have_http_status(:success)
      expect(json.length).to eql(1)
    end
  end

  context '#update_members' do
    let(:team) { FactoryBot.create(:dms_team) }
    let(:user2) { FactoryBot.create(:user) }

    it 'anon' do
      post "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}/update_members"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}/update_members",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}/update_members",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      team.users << user2
      expect(team.users.count).to eql(1)
      post "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}/update_members",
        headers: credentials(team.project.user),
        params: { users: [user.id] }
      expect(response).to have_http_status(:success)
      expect(team.users.count).to eql(1)
      expect(team.users.first.id).to eql(user.id)
    end
  end
end
