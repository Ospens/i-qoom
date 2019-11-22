require 'rails_helper'

RSpec.describe DmsTeam, type: :model do
  it '#assign_document_rights' do
    team = FactoryBot.create(:dms_team)
    expect(team.document_rights.length).to eql(3)
  end
end
