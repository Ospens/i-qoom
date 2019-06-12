require 'rails_helper'

RSpec.describe Convention, type: :model do
  context  'create_default_fields' do
    let(:convention) { FactoryBot.create(:convention) }

    it { expect(convention.document_fields.count).to eql(9) }
    it { expect(convention.document_fields.pluck(:codification_kind).compact).to\
      eq(['originating_company', 'discipline', 'additional_information', 'document_native_file', 'document_type', 'document_number', 'revision_number', 'revision_date', 'revision_version']) }
    it do
      convention2 = FactoryBot.create(:convention, number: 2)
      expect(convention2.document_fields.pluck(:codification_kind).compact).to\
        eq(['originating_company', 'receiving_company', 'discipline', 'additional_information', 'document_native_file', 'document_type', 'document_number', 'revision_number', 'revision_date', 'revision_version'])
    end

    context 'should set column and row' do
      before do
        convention.build_default_fields
      end

      def find_field(kind)
        convention.document_fields.find_by(codification_kind: kind)
      end

      it do
        field = find_field(:originating_company)
        expect(field.column).to eql(1)
        expect(field.row).to eql(3)
      end

      it do
        convention = FactoryBot.create(:convention, number: 2)
        convention.build_default_fields
        field = convention.document_fields.find_by(codification_kind: :receiving_company)
        expect(field.column).to eql(1)
        expect(field.row).to eql(4)
      end

      it do
        field = find_field(:discipline)
        expect(field.column).to eql(1)
        expect(field.row).to eql(4)
        convention = FactoryBot.create(:convention, number: 2)
        convention.build_default_fields
        field = convention.document_fields.find_by(codification_kind: :discipline)
        expect(field.column).to eql(1)
        expect(field.row).to eql(5)
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
        expect(field.row).to eql(5)
        convention = FactoryBot.create(:convention, number: 2)
        convention.build_default_fields
        field = convention.document_fields.find_by(codification_kind: :additional_information)
        expect(field.column).to eql(1)
        expect(field.row).to eql(6)
      end

      it do
        field = find_field(:document_native_file)
        expect(field.column).to eql(1)
        expect(field.row).to eql(6)
        convention = FactoryBot.create(:convention, number: 2)
        convention.build_default_fields
        field = convention.document_fields.find_by(codification_kind: :document_native_file)
        expect(field.column).to eql(1)
        expect(field.row).to eql(7)
      end
    end
  end

  it 'attributes_for_edit' do
    project = FactoryBot.create(:project)
    convention = project.conventions.new(number: 1)
    convention.build_default_fields
    expect(convention).to_not be_valid
    convention.document_fields.each do |field|
      next unless field.select_field?
      value =
        field.document_field_values.new(value: Faker::Name.initials(3),
                                        position: 1,
                                        title: '')
    end
    expect(convention).to be_valid
    convention.save
    json = convention.attributes_for_edit
    fields = json['document_fields']
    version = fields.detect{ |i| i['codification_kind'] == 'revision_version' }
    expect(version).to be_blank
  end
end
