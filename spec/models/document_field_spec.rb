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
    doc1 = FactoryBot.create(:document, revision: rev1)
    main = rev1.document_main
    field = FactoryBot.create(:document_field,
                              kind: :codification_field,
                              codification_kind: :revision_number,
                              value: 1,
                              parent: doc1)
    rev2 = main.revisions.create
    doc2 = rev2.versions.new(doc1.reload.attributes_for_edit)
    expect(doc2).to_not be_valid
    expect(doc2.errors.count).to eql(2)
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '2'
    expect(doc2).to be_valid
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '100'
    expect(doc2).to_not be_valid
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '99'
    expect(doc2).to be_valid
  end

  it 'revision_version_valid' do
    ver1 = FactoryBot.build(:document)
    rev = ver1.revision
    field = FactoryBot.build(:document_field, kind: :codification_field, codification_kind: :revision_version)
    ver1.document_fields << field
    ver1.save!
    expect(ver1.document_fields.detect{ |i| i['codification_kind'] == 'revision_version' }.value).to eql('0')
    expect(ver1.revision_version).to eql('0')
    ver2 = rev.versions.new(ver1.attributes_for_edit)
    ver2.save!
    expect(ver2.document_fields.detect{ |i| i['codification_kind'] == 'revision_version' }.value).to eql('1')
    expect(ver2.revision_version).to eql('1')
    ver1.save!
    expect(ver1.document_fields.detect{ |i| i['codification_kind'] == 'revision_version' }.value).to eql('0')
    expect(ver1.revision_version).to eql('0')
  end

  context 'prevents codification fields updating by' do
    it 'updating document' do
      doc = FactoryBot.create(:document)
      field = doc.document_fields.find_by(codification_kind: DocumentField.codification_kinds[:originating_company])
      field.document_field_values.update_all(selected: false)
      value1 = FactoryBot.create(:document_field_value, value: '111', selected: true, document_field: field)
      value2 = FactoryBot.create(:document_field_value, value: '222', document_field: field)
      doc_attrs = doc.reload.attributes_for_edit
      doc_attrs['document_fields_attributes']
        .detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes']
        .detect{ |i| i['value'] == value1.value }['value'] = '333'
      doc.assign_attributes(doc_attrs)
      expect(doc).to_not be_valid
    end

    it 'creating new version' do
      rev = FactoryBot.create(:document_revision)
      doc = FactoryBot.create(:document, revision: rev)
      field = doc.document_fields.find_by(codification_kind: DocumentField.codification_kinds[:originating_company])
      field.document_field_values.update_all(selected: false)
      value1 = FactoryBot.create(:document_field_value, value: '111', selected: true, document_field: field)
      value2 = FactoryBot.create(:document_field_value, value: '222', document_field: field)
      doc_attrs = doc.reload.attributes_for_edit
      doc_attrs['document_fields_attributes']
        .detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes']
        .detect{ |i| i['value'] == value1.value }['value'] = '333'
      doc2 = rev.versions.new(doc_attrs)
      expect(doc2).to_not be_valid
    end

    it 'creating new revision' do
      rev = FactoryBot.create(:document_revision)
      main = rev.document_main
      doc = FactoryBot.create(:document, revision: rev)
      field = doc.document_fields.find_by(codification_kind: DocumentField.codification_kinds[:originating_company])
      field.document_field_values.update_all(selected: false)
      value1 = FactoryBot.create(:document_field_value, value: '111', selected: true, document_field: field)
      value2 = FactoryBot.create(:document_field_value, value: '222', document_field: field)
      doc_attrs = doc.reload.attributes_for_edit
      doc_attrs['document_fields_attributes']
        .detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes']
        .detect{ |i| i['value'] == value1.value }['value'] = '333'
      rev2 = FactoryBot.create(:document_revision, document_main: main)
      doc2 = rev2.versions.new(doc_attrs)
      expect(doc2).to_not be_valid
    end
  end
end
