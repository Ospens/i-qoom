require 'rails_helper'

RSpec.describe DmsTeam, type: :model do
  it '#assign_document_rights' do
    team = FactoryBot.create(:dms_team)
    expect(team.document_rights.length).to eql(3)
  end

  it 'destroy' do
    team = FactoryBot.create(:dms_team)
    expect(DocumentRight.count).to eql(3)
    team.destroy
    expect(DocumentRight.count).to eql(0)
  end

  it 'select users from dms teams' do
    team1 = FactoryBot.create(:dms_team)
    project = team1.project
    team2 = FactoryBot.create(:dms_team)
    team2.update!(project: project)
    ids = project.dms_teams.pluck(:id)
    user1 = FactoryBot.create(:user)
    expect(User.joins(:dms_teams).where(dms_teams: { id: ids }).count).to eql(0)
    team1.users << user1
    user2 = FactoryBot.create(:user)
    team2.users << user2
    expect(User.joins(:dms_teams).where(dms_teams: { id: ids }).count).to eql(2)
  end
end
