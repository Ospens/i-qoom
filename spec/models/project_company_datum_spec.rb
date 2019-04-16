require 'rails_helper'

RSpec.describe ProjectCompanyDatum, type: :model do
  it { is_expected.to belong_to(:project) }
  it { is_expected.to validate_presence_of(:vat_id) }
end
