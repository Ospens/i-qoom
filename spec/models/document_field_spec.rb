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

    context 'should set column and row' do
      before do
        subject.kind = :codification_field
        subject.column = nil
        subject.row = nil
      end

      it do
        subject.codification_kind = :originating_company
        subject.valid?
        expect(subject.column).to eql(1)
        expect(subject.row).to eql(3)
      end

      it do
        subject.codification_kind = :receiving_company
        subject.valid?
        expect(subject.column).to eql(1)
        expect(subject.row).to eql(4)
      end

      it do
        subject.codification_kind = :discipline
        subject.valid?
        expect(subject.column).to eql(1)
        expect(subject.row).to eql(4)
      end

      it do
        subject.codification_kind = :discipline
        subject.parent.update(number: 2)
        subject.valid?
        expect(subject.column).to eql(1)
        expect(subject.row).to eql(5)
      end

      it do
        subject.codification_kind = :document_type
        subject.valid?
        expect(subject.column).to eql(2)
        expect(subject.row).to eql(1)
      end

      it do
        subject.codification_kind = :document_number
        subject.valid?
        expect(subject.column).to eql(2)
        expect(subject.row).to eql(2)
      end
    end
  end
end
