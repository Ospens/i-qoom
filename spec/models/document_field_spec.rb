require 'rails_helper'

RSpec.describe DocumentField, type: :model do
  context 'validate :value_by_kind' do
    subject { FactoryBot.build(:document_field) }

    it { should be_valid }

    [:select_field, :project_phase_field].each do |kind|
      it kind do
        subject.kind = kind
        should be_valid
        subject.document_field_values.delete_all
        should_not be_valid
      end
    end

    it 'codification_field' do
      subject.kind = :codification_field
      subject.codification_kind = :originating_company
      should be_valid
      subject.document_field_values.delete_all
      should be_valid
      subject.save
      should_not be_valid
    end
  end

  context '#can_build?' do
    subject { FactoryBot.create(:document_field) }
    let(:user) { FactoryBot.create(:user) }

    it 'non codification' do
      expect(subject).to_not be_codification_field
      expect(subject.parent.class.name).to eql('Convention')
      subject.document_rights.create(document_field: subject, limit_for: :field, user: user)
      expect(subject.can_build?(user)).to eql(true)
      subject.parent = FactoryBot.create(:document)
      expect(subject.can_build?(user)).to eql(false)
    end

    it 'codification' do
      subject.kind = :codification_field
      expect(subject).to be_codification_field
      expect(subject.document_rights).to_not be_any
      expect(subject.can_build?(user)).to eql(true)
      expect(subject.document_field_values).to be_any
      right = subject.document_rights.create(document_field: subject, limit_for: :field, user: user)
      expect(subject.can_build?(user)).to eql(false)
      right.update(limit_for: :value, document_field_value: subject.document_field_values.first)
      expect(subject.can_build?(user)).to eql(true)
    end
  end
end
