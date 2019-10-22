require 'rails_helper'

RSpec.describe Role, type: :model do
  it { is_expected.to have_many(:project_members) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_uniqueness_of(:title)
                        .scoped_to(:project_id) }
  it { is_expected.to validate_length_of(:title)
                        .is_at_least(2)
                        .is_at_most(255) }

  it "Project Administrator role can't be renamed" do
    project_admin_role =
      FactoryBot.create(:project)
                .roles
                .find_by(title: "Project Administrator")
    project_admin_role.title = "Different Role Title"
    project_admin_role.save
    project_admin_role.reload
    expect(project_admin_role.title).to eq("Project Administrator")
  end
  it "Any other role can be renamed" do
    project_admin_role =
      FactoryBot.create(:project)
                .roles
                .where
                .not(title: "Project Administrator")
                .sample
    project_admin_role.title = "Different Role Title"
    project_admin_role.save
    project_admin_role.reload
    expect(project_admin_role.title).to eq("Different Role Title")
  end
end
