require 'rails_helper'

RSpec.describe Role, type: :model do
  it { is_expected.to have_many(:project_members) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_uniqueness_of(:title)
                        .scoped_to(:project_id) }
  it { is_expected.to validate_length_of(:title)
                        .is_at_least(2)
                        .is_at_most(255) }
end
