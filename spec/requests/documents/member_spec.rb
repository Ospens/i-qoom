require 'rails_helper'

describe User, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }

  context 'show' do
    let(:doc) do
      attrs = document_attributes(user)
      Document.create(attrs)
    end
    let(:project) { doc.project }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/documents/members/#{user.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/documents/members/#{user.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/documents/members/#{user.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      team = project.dms_teams.create(name: '111')
      team.users << user
      get "/api/v1/projects/#{project.id}/documents/members/#{user.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('first_name')
      expect(json).to have_key('last_name')
      expect(json).to have_key('email')
      expect(json).to have_key('username')
      expect(json).to have_key('city')
      expect(json).to have_key('country')
      expect(json).to have_key('state')
      expect(json['rights'].length).to eql(3)
      expect(json['teams'].length).to eql(1)
      expect(json['teams'].first['name']).to eql('111')
    end
  end
end
