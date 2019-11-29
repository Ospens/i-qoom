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
      team.users << user
      get "/api/v1/projects/#{team.project.id}/dms_teams/#{team.id}",
        headers: credentials(team.project.user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('name')
      expect(json['users'].length).to eql(1)
      expect(json['document_rights'].length).to eql(3)
      expect(json['fields'].length).to eql(3)
    end
  end

  context '#index_for_documents' do
    let(:team) { FactoryBot.create(:dms_team) }

    it 'anon' do
      get "/api/v1/projects/#{team.project.id}/dms_teams/index_for_documents"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{team.project.id}/dms_teams/index_for_documents",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{team.project.id}/dms_teams/index_for_documents",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      team.users << user
      get "/api/v1/projects/#{team.project.id}/dms_teams/index_for_documents",
        headers: credentials(team.project.user)
      expect(response).to have_http_status(:success)
      expect(json.first).to have_key('name')
      expect(json.first['users'].length).to eql(1)
      expect(json.first['users'].first).to have_key('email')
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
      team.users << user
      get "/api/v1/projects/#{team.project.id}/dms_teams",
        headers: credentials(team.project.user),
        params: { only_new: true }
      expect(response).to have_http_status(:success)
      expect(json['teams'].length).to eql(1)
      expect(json['teams'].first['users'].length).to eql(1)
      user_attrs = json['teams'].first['users'].first
      expect(user_attrs).to have_key('id')
      expect(user_attrs).to have_key('first_name')
      expect(user_attrs).to have_key('last_name')
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

  context '#update_rights' do
    let(:team) { FactoryBot.create(:dms_team) }

    it 'anon' do
      post "/api/v1/projects/#{team.project.id}/dms_teams/update_rights"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{team.project.id}/dms_teams/update_rights",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{team.project.id}/dms_teams/update_rights",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      attrs = DocumentRight.attributes_for_teams(team.project, true)
      attrs[:teams].first[:document_rights].first['enabled'] = true
      post "/api/v1/projects/#{team.project.id}/dms_teams/update_rights",
        headers: credentials(team.project.user),
        params: attrs
      expect(response).to have_http_status(:success)
      expect(team.document_rights.where(enabled: true).count).to eql(1)
    end
  end
end
