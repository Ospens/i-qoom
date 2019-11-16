require 'rails_helper'

describe User, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }

  it 'show' do
    doc = document_attributes(user)
    doc = Document.create(doc)
    project = doc.project
    project.user.project_administrators.first.update(user: user)
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
