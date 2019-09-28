require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:project) { FactoryBot.create(:project) }
  let(:user) { FactoryBot.create(:user) }

  it 'project code' do
    serializer = ProjectSerializer.new(project).serializable_hash
    expect(serializer).to_not have_key(:project_code)
    project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
    serializer = ProjectSerializer.new(project, user: user).serializable_hash
    expect(serializer).to have_key(:project_code)
  end
end
