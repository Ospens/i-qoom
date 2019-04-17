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

    context 'codification field' do
      [:originating_company, :receiving_company, :discipline, :document_type].each do |kind|
        it kind do
          subject.kind = :codification_field
          subject.codification_kind = kind
          should be_valid
          subject.document_field_values.delete_all
          should_not be_valid
        end
      end

      [:document_number, :revision_number, :revision_version].each do |kind|
        it kind do
          subject.kind = :codification_field
          subject.codification_kind = kind
          should be_valid
          subject.document_field_values.delete_all
          should be_valid
        end
      end
    end
  end

  context '#can_build?' do
    subject { FactoryBot.create(:document_field) }
    let(:user) { FactoryBot.create(:user) }

    context 'non codification' do
      before do
        subject.document_rights.create(document_field: subject, limit_for: :field, user: user)
      end

      it do
        expect(subject).to_not be_codification_field
        expect(subject.parent.class.name).to eql('Convention')
        expect(subject.can_build?(user)).to eql(true)
      end

      it do
        subject.parent = FactoryBot.create(:document)
        expect(subject.can_build?(user)).to eql(false)
      end
    end

    context 'codification' do
      before do
        subject.kind = :codification_field
        subject.codification_kind = :originating_company
      end

      it do
        expect(subject).to be_codification_field
        expect(subject.document_rights).to_not be_any
        expect(subject.can_build?(user)).to eql(false)
      end

      it do
        expect(subject.document_field_values).to be_any
        subject.document_rights.create(limit_for: :field, user: user)
        expect(subject.can_build?(user)).to eql(false)
      end

      it do
        subject.document_rights.create(limit_for: :value,
                                       user: user,
                                       document_field_value: subject.document_field_values.first)
        expect(subject.can_build?(user)).to eql(true)
      end
    end
  end

  context '#can_limit_by_value?' do
    subject { FactoryBot.build(:document_field, kind: :codification_field) }
    kinds = ['originating_company', 'discipline', 'document_type']

    kinds.each do |kind|
      it kind do
        subject.codification_kind = kind
        expect(subject).to be_can_limit_by_value
      end
    end

    (DocumentField.codification_kinds.keys - kinds).each do |kind|
      it kind do
        subject.codification_kind = kind
        expect(subject).to_not be_can_limit_by_value
      end
    end
  end

  context '#should_have_document_field_values?' do
    subject { FactoryBot.build(:document_field) }
    kinds = ['select_field', 'project_phase_field']

    kinds.each do |kind|
      it kind do
        subject.kind = kind
        expect(subject).to be_should_have_document_field_values
      end
    end

    (DocumentField.kinds.keys - kinds).each do |kind|
      it kind do
        subject.kind = kind
        expect(subject).to_not be_should_have_document_field_values
      end
    end

    kinds = ['originating_company', 'receiving_company', 'discipline', 'document_type']

    kinds.each do |kind|
      it kind do
        subject.kind = :codification_field
        subject.codification_kind = kind
        expect(subject).to be_should_have_document_field_values
      end
    end

    (DocumentField.codification_kinds.keys - kinds).each do |kind|
      it kind do
        subject.kind = :codification_field
        subject.codification_kind = kind
        expect(subject).to_not be_should_have_document_field_values
      end
    end
  end
end
