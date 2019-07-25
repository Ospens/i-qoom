require 'rails_helper'

RSpec.describe Discipline, type: :model do
  it { is_expected.to have_many(:project_members) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_length_of(:name)
                        .is_at_least(3)
                        .is_at_most(255) }
end
