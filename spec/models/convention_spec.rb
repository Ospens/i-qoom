require 'rails_helper'

RSpec.describe Convention, type: :model do
  context  'create_default_fields' do
    let(:convention) { FactoryBot.create(:convention) }

    it { expect(convention.document_fields.count).to eql(7) }
    it { expect(convention.document_fields.pluck(:codification_kind).compact).to\
      eq(['originating_company', 'discipline', 'document_type', 'document_number', 'revision_number', 'revision_date']) }
    it do
      convention2 = FactoryBot.create(:convention, number: 2)
      expect(convention2.document_fields.pluck(:codification_kind).compact).to\
        eq(['originating_company', 'receiving_company', 'discipline', 'document_type', 'document_number', 'revision_number', 'revision_date'])
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
        field = convention.document_fields.find_by(kind: :upload_field)
        expect(field.column).to eql(1)
        expect(field.row).to eql(5)
        convention = FactoryBot.create(:convention, number: 2)
        convention.build_default_fields
        field = convention.document_fields.find_by(kind: :upload_field)
        expect(field.column).to eql(1)
        expect(field.row).to eql(6)
      end
    end
  end
end
