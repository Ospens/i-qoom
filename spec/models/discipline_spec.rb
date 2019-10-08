require 'rails_helper'

RSpec.describe Discipline, type: :model do
  it { is_expected.to have_many(:project_members) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_uniqueness_of(:title)
                        .scoped_to(:project_id) }
  it { is_expected.to validate_length_of(:title)
                        .is_at_least(2)
                        .is_at_most(255) }

  it "i-Qoom Admin discipline can't be renamed" do
    iqoom_admin_discipline =
      FactoryBot.create(:project)
                .disciplines
                .find_by(title: "i-Qoom Admin")
    iqoom_admin_discipline.title = "Different Discipline Title"
    iqoom_admin_discipline.save
    iqoom_admin_discipline.reload
    expect(iqoom_admin_discipline.title).to eq("i-Qoom Admin")
  end
  it "Any other role can be renamed" do
    iqoom_admin_discipline =
      FactoryBot.create(:project)
                .disciplines
                .where
                .not(title: "i-Qoom Admin")
                .sample
    iqoom_admin_discipline.title = "Different Discipline Title"
    iqoom_admin_discipline.save
    iqoom_admin_discipline.reload
    expect(iqoom_admin_discipline.title).to eq("Different Discipline Title")
  end
end
