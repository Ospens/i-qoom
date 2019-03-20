require 'rails_helper'

RSpec.describe ConventionField, type: :model do
  context 'validate :value_by_kind' do
    subject { FactoryBot.build(:convention_field) }

    it { should be_valid }

    [:text_field, :textarea_field, :upload_field, :date_field].each do |kind|
      it kind do
        subject.kind = kind
        subject.value = 1
        should_not be_valid
        subject.value = ''
        should be_valid
      end
    end

    [:select_field, :project_phase_field].each do |kind|
      it kind do
        subject.kind = kind
        subject.value = 1
        should_not be_valid
        subject.value = []
        should_not be_valid
        subject.value = ['1']
        should be_valid
      end
    end

    it 'codification_field' do
      subject.kind = :codification_field
      subject.codification_kind = :originating_company
      subject.value = [{code: '1'}]
      should_not be_valid
      subject.value = [{position: '1'}]
      should_not be_valid
      subject.value = [{code: '1', position: '1'}]
      should be_valid
      subject.value = nil
      should be_valid
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
        subject.convention.update(number: 2)
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
