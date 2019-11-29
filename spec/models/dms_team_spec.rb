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
end
