require 'rails_helper'

RSpec.describe DocumentRight, type: :model do
  subject { FactoryBot.build(:document_right) }

  it { should be_valid }

  context '#limit_for_based_on_field_kind' do
    it 'codification_field' do
      subject.document_field.kind = :codification_field
      subject.document_field.codification_kind = :originating_company
      expect(subject).to_not be_valid
      subject.document_field_value = FactoryBot.build(:document_field_value)
      expect(subject).to_not be_valid
      subject.limit_for = :value
      expect(subject).to be_valid
    end

    it 'non codification_field' do
      expect(subject).to be_limit_for_field
      expect(subject.document_field).to_not be_codification_field
      subject.user = nil
      expect(subject).to_not be_valid
    end
  end
end
