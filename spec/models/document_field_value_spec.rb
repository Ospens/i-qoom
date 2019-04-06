require 'rails_helper'

RSpec.describe DocumentFieldValue, type: :model do
  subject { FactoryBot.build(:document_field_value) }

  it { should be_valid }
end
