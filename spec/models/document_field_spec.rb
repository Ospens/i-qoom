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
        subject.parent = FactoryBot.create(:document_main)
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

  it 'revision_number_valid' do
    rev1 = FactoryBot.create(:document_revision)
    main = rev1.document_main
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 1)
    rev1.document_fields << field
    rev2 = FactoryBot.build(:document_revision, document_main: main)
    rev2.document_fields.new(FactoryBot.attributes_for(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 1))
    expect(rev2).to_not be_valid
    expect(rev2.errors.count).to eql(2)
    rev2.document_fields.first.value = 2
    expect(rev2).to be_valid
    rev2.document_fields.first.value = 100
    expect(rev2).to_not be_valid
    rev2.document_fields.first.value = 99
    expect(rev2).to be_valid
  end

  it 'revision_version_valid' do
    ver1 = FactoryBot.build(:document_version)
    rev = ver1.revision
    field = FactoryBot.build(:document_field, kind: :codification_field, codification_kind: :revision_version)
    ver1.document_fields << field
    ver1.save!
    expect(ver1.document_fields.first.value).to eql('0')
    expect(ver1.revision_version).to eql('0')
    ver2 = FactoryBot.build(:document_version, revision: rev)
    field = FactoryBot.build(:document_field, kind: :codification_field, codification_kind: :revision_version)
    ver2.document_fields << field
    ver2.save!
    expect(ver2.document_fields.first.value).to eql('1')
    expect(ver2.revision_version).to eql('1')
    ver1.save!
    expect(ver1.document_fields.first.value).to eql('0')
    expect(ver1.revision_version).to eql('0')
  end
end
