require 'rails_helper'

RSpec.describe Address, type: :model do
  it { is_expected.to allow_value("", nil).for(:country) }
  it { is_expected.to validate_inclusion_of(:country)
                        .in_array(ISO3166::Country.codes) }
end
