require 'rails_helper'

RSpec.describe DocumentField, type: :model do
  context 'validate :value_by_kind' do
    let(:document) { FactoryBot.build(:document) }
    subject { FactoryBot.build(:document_field, parent: document) }

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
          subject.kind = :select_field
          subject.codification_kind = kind
          subject.document_field_values.first.selected = true
          should be_valid
          subject.document_field_values.delete_all
          should_not be_valid
        end
      end

      [:document_number, :revision_number, :revision_version].each do |kind|
        it kind do
          subject.kind = :text_field
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
        subject.document_rights.create(document_field: subject,
                                       limit_for: :field,
                                       user: user,
                                       enabled: true)
      end
      # limitation by field is temporarily disabled
      # it do
      #   expect(subject).to_not be_select_field
      #   expect(subject.parent.class.name).to eql('Convention')
      #   expect(subject.can_build?(user)).to eql(true)
      # end

      it do
        subject.parent = FactoryBot.create(:document_main)
        expect(subject.can_build?(user)).to eql(false)
      end
    end

    context 'codification' do
      before do
        subject.kind = :select_field
        subject.codification_kind = :originating_company
      end

      it do
        expect(subject).to be_select_field
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
    subject { FactoryBot.build(:document_field, kind: :select_field) }
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
  end

  it 'revision_number_valid' do
    doc1 = FactoryBot.create(:document)
    rev1 = doc1.revision
    main = rev1.document_main
    field = doc1.document_fields.find_by(codification_kind: :revision_number)
    field.update!(value: 1)
    rev2 = main.revisions.create
    attrs = assign_attributes_suffix_to_document(doc1.reload.attributes_for_edit)
    doc2 = rev2.versions.new(attrs)
    expect(doc2).to_not be_valid
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '2'
    expect(doc2).to be_valid
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '100'
    expect(doc2).to_not be_valid
    doc2.document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }.value = '99'
    expect(doc2).to be_valid
  end

  it 'revision_version_valid' do
    ver1 = FactoryBot.create(:document)
    rev = ver1.revision
    field = ver1.document_fields.find_by(codification_kind: :revision_version)
    expect(field.value).to eql('0')
    expect(ver1.revision_version).to eql('0')
    attrs = assign_attributes_suffix_to_document(ver1.attributes_for_edit)
    ver2 = rev.versions.new(attrs)
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
      doc_attrs = assign_attributes_suffix_to_document(doc.reload.attributes_for_edit)
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
      doc_attrs = assign_attributes_suffix_to_document(doc.reload.attributes_for_edit)
      doc_attrs['document_fields_attributes']
        .detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes']
        .detect{ |i| i['value'] == value1.value }['value'] = '333'
      doc2 = rev.versions.new(doc_attrs)
      expect(doc2).to_not be_valid
    end

    it 'creating new revision' do
      doc = FactoryBot.create(:document)
      rev = doc.revision
      main = rev.document_main
      field = doc.document_fields.find_by(codification_kind: :originating_company)
      field.document_field_values.update_all(selected: false)
      value1 = FactoryBot.create(:document_field_value, value: '111', selected: true, document_field: field)
      value2 = FactoryBot.create(:document_field_value, value: '222', document_field: field)
      doc_attrs = assign_attributes_suffix_to_document(doc.reload.attributes_for_edit)
      doc_attrs['document_fields_attributes']
        .detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes']
        .detect{ |i| i['value'] == value1.value }['value'] = '333'
      rev2 = FactoryBot.create(:document_revision, document_main: main)
      doc2 = rev2.versions.new(doc_attrs)
      expect(doc2).to_not be_valid
    end
  end

  context '#field_is_required' do
    let(:document) { FactoryBot.create(:document) }

    it 'text_field' do
      field = FactoryBot.build(:document_field, required: true)
      document.document_fields << field
      expect(document).to be_valid
      field.value = nil
      expect(document).to_not be_valid
    end

    [:textarea_field, :date_field].each do |kind|
      it kind do
        field = FactoryBot.build(:document_field, required: true, kind: kind)
        document.document_fields << field
        expect(document).to be_valid
        field.value = nil
        expect(document).to_not be_valid
      end
    end

    it 'select_field' do
      field = FactoryBot.build(:document_field, required: true, kind: :select_field)
      value = FactoryBot.build(:document_field_value, selected: true)
      field.document_field_values << value
      document.document_fields << field
      expect(document).to be_valid
      value.selected = false
      expect(document).to_not be_valid
    end

    it 'project_phase_field' do
      field = FactoryBot.build(:document_field, required: true, kind: :project_phase_field)
      value = FactoryBot.build(:document_field_value, selected: true)
      field.document_field_values << value
      document.document_fields << field
      expect(document).to be_valid
      value.selected = false
      expect(document).to_not be_valid
    end

    ['originating_company', 'discipline', 'document_type'].each do |kind|
      it kind do
        document.document_fields
                .detect{ |i| i['codification_kind'] == kind }
                .document_field_values
                .first.selected = false
        expect(document).to_not be_valid
      end
    end

    it 'receiving_company' do
      field = FactoryBot.build(:document_field, required: true, kind: :select_field, codification_kind: :receiving_company)
      value = FactoryBot.build(:document_field_value, selected: true)
      field.document_field_values << value
      document.document_fields << field
      expect(document).to be_valid
      value.selected = false
      expect(document).to_not be_valid
    end

    [:document_number, :revision_number].each do |kind|
      it kind do
        field = FactoryBot.build(:document_field, required: true, kind: :text_field, codification_kind: kind)
        document.document_fields << field
        expect(document).to be_valid
        field.value = nil
        expect(document).to_not be_valid
      end
    end

    it 'revision_date' do
      field = document.document_fields.find_by(codification_kind: :revision_date)
      expect(field).to be_valid
      field.value = nil
      expect(field).to_not be_valid
    end

    it 'upload_field' do
      field = FactoryBot.create(:document_field, required: true, kind: :upload_field)
      document.project.conventions.active.document_fields << field
      field.file.attach(fixture_file_upload('test.txt'))
      document.document_fields << field
      expect(document).to be_valid
      field.file.purge
      expect(document).to_not be_valid
    end
  end

  it '#multiselect_is_not_allowed' do
    document = FactoryBot.create(:document)
    value = FactoryBot.build(:document_field_value, selected: true)
    field = document.document_fields.find_by(codification_kind: :originating_company)
    field.document_field_values << value
    expect(field).to_not be_valid
    expect(field.errors.count).to eql(1)
    value.selected = false
    expect(field).to be_valid
  end

  context '#attach_previous_native_file' do
    let(:doc) { FactoryBot.create(:document) }
    let(:rev) { doc.revision }
    let(:doc_attrs) { assign_attributes_suffix_to_document(doc.attributes_for_edit) }
    let(:file_field1) { doc.document_fields.find_by(codification_kind: :document_native_file) }

    it 'new version' do
      file1 = file_field1.file
      doc2 = rev.versions.create!(doc_attrs)
      file_field2 = doc2.document_fields.find_by(codification_kind: :document_native_file)
      file2 = file_field2.file
      expect(file1.blob_id).to_not eql(file2.blob_id)
      expect(file1.download).to eql(file2.download)
    end

    it 'new revision' do
      file1 = file_field1.file
      rev2 = FactoryBot.create(:document_revision, document_main: rev.document_main)
      doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }['value'] = '2'
      doc2 = rev2.versions.create!(doc_attrs)
      file_field2 = doc2.document_fields.find_by(codification_kind: :document_native_file)
      file2 = file_field2.file
      expect(file1.blob_id).to_not eql(file2.blob_id)
      expect(file1.download).to eql(file2.download)
    end
  end
end
