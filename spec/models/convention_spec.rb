require 'rails_helper'

RSpec.describe Convention, type: :model do
  context 'create_default_fields' do
    let(:project) { FactoryBot.create(:project) }
    let(:convention) { project.conventions.active }
    let(:convention2) { project.conventions.create(number: 2) }
    let(:kinds) do
      [ 'originating_company',
        'discipline',
        'additional_information',
        'document_native_file',
        'document_type',
        'document_number',
        'revision_number',
        'revision_date',
        'revision_version' ]
    end

    it { expect(convention.document_fields.count).to eql(9) }

    it { expect(convention2.document_fields.count).to eql(10) }

    it do
      existent_kinds =
        convention.document_fields.pluck(:codification_kind).compact
      kinds.each do |kind|
        expect(existent_kinds).to include(kind)
      end
    end

    it do
      existent_kinds =
        convention2.document_fields.pluck(:codification_kind).compact
      expect(existent_kinds).to include('receiving_company')
      kinds.each do |kind|
        expect(existent_kinds).to include(kind)
      end
    end

    context 'should set column and row' do
      def find_field(kind)
        convention.document_fields.find_by(codification_kind: kind)
      end

      it do
        field = find_field(:originating_company)
        expect(field.column).to eql(1)
        expect(field.row).to eql(1)
      end

      it do
        field = convention2.document_fields.find_by(codification_kind: :receiving_company)
        expect(field.column).to eql(1)
        expect(field.row).to eql(2)
      end

      it do
        field = find_field(:discipline)
        expect(field.column).to eql(1)
        expect(field.row).to eql(2)
        field = convention2.document_fields.find_by(codification_kind: :discipline)
        expect(field.column).to eql(1)
        expect(field.row).to eql(3)
      end

      it do
        field = find_field(:document_type)
        expect(field.column).to eql(2)
        expect(field.row).to eql(1)
      end

      it do
        field = find_field(:document_number)
        expect(field.column).to eql(2)
        expect(field.row).to eql(2)
      end

      it do
        field = find_field(:additional_information)
        expect(field.column).to eql(1)
        expect(field.row).to eql(3)
        field = convention2.document_fields.find_by(codification_kind: :additional_information)
        expect(field.column).to eql(1)
        expect(field.row).to eql(4)
      end

      it do
        field = find_field(:document_native_file)
        expect(field.column).to eql(1)
        expect(field.row).to eql(4)
        field = convention2.document_fields.find_by(codification_kind: :document_native_file)
        expect(field.column).to eql(1)
        expect(field.row).to eql(5)
      end
    end
  end

  it 'attributes_for_edit' do
    project = FactoryBot.create(:project)
    convention = project.conventions.new(number: 1)
    convention.build_default_fields
    convention.save
    json = convention.attributes_for_edit
    fields = json['document_fields']
    version = fields.detect{ |i| i['codification_kind'] == 'revision_version' }
    expect(version).to be_blank
  end

  it 'updates convention version' do
    project = FactoryBot.create(:project)
    convention = project.conventions.new(number: 1)
    convention.build_default_fields
    convention.valid?
    expect(convention.version).to eql(2)
    convention.save
    convention = project.conventions.new(number: 1)
    convention.valid?
    expect(convention.version).to eql(3)
  end

  context 'validates old convention document_fields' do
    let(:project) { FactoryBot.create(:project) }
    let!(:convention1) do
      convention = project.conventions.new(number: 1)
      convention.build_default_fields
      convention.document_fields.each do |field|
        next unless field.select_field?
        value =
          field.document_field_values.new(value: Faker::Name.initials,
                                          position: 1,
                                          title: '')
      end
      convention.save!
      convention
    end
    let(:convention2) do
      convention = project.conventions.new(number: 1)
      convention.build_default_fields
      convention.document_fields.each do |field|
        next unless field.select_field?
        value =
          field.document_field_values.new(value: Faker::Name.initials,
                                          position: 1,
                                          title: '')
      end
      convention
    end

    it { expect(convention2).to be_valid }

    it 'remove codification field' do
      field = convention2.document_fields.detect{ |i| i['codification_kind'] == 'originating_company' }
      convention2.document_fields.delete(field)
      expect(convention2).to_not be_valid
    end

    it 'add custom field' do
      convention2.document_fields.new(kind: :text_field, column: 1)
      expect(convention2).to be_valid
    end

    it 'remove custom field' do
      convention1.document_fields.create!(kind: :text_field, column: 1)
      expect(convention2).to be_valid
    end

    it 'remove one field and add another' do
      field = convention2.document_fields.detect{ |i| i['codification_kind'] == 'originating_company' }
      convention2.document_fields.delete(field)
      convention2.document_fields.new(kind: :text_field, column: 1)
      expect(convention2).to_not be_valid
    end
  end

  it 'validate_presence_of_required_fields' do
    project = FactoryBot.create(:project)
    project.conventions.active.destroy
    convention = project.conventions.new(number: 1)
    convention.valid?
    field =
      convention.document_fields
                .detect{ |i| i['codification_kind'] == 'originating_company' }
    convention.document_fields = convention.document_fields - [field]
    expect(convention).to_not be_valid
    expect(convention.errors[:document_fields]).to\
      eql(['originating_company_field_in_not_present'])
  end

  it '#build_default_fields' do
    project = FactoryBot.create(:project)
    expect(project.conventions.active).to be_present
  end
end
