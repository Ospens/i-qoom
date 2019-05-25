require 'rails_helper'

RSpec.describe DocumentFolder, type: :model do
  context 'all_documents' do
    let(:project) { FactoryBot.create(:project) }
    let(:user) { FactoryBot.create(:user) }
    let(:folder) { FactoryBot.create(:document_folder, project: project, user: user) }
    let!(:doc1) { FactoryBot.create(:document) }
    let!(:doc2) { FactoryBot.create(:document) }

    before do
      dbl = double
      allow(project).to receive(:document_mains).and_return(dbl)
      # assume user has access to all documents
      allow(dbl).to receive(:documents_available_for).with(user).and_return(Document.all)
    end

    def create_field(folder, kind)
      field = doc1.document_fields.find_by(codification_kind: kind)
      field.update(value: Faker::Name.initials(3))
      value = field.value
      folder.document_fields.create!(kind: :codification_field,
                                     codification_kind: field.codification_kind,
                                     column: 1,
                                     value: value)
    end

    it 'documents' do
      dbl = double
      allow(project).to receive(:document_mains).and_return(dbl)
      allow(dbl).to receive(:documents_available_for).with(user).and_return([])
      folder.documents << doc1
      expect(folder.all_documents.pluck(:id)).to eql([doc1.id])
    end

    it 'originating company' do
      create_field(folder, :originating_company)
      expect(folder.all_documents.pluck(:id)).to eql([doc1.id])
    end

    it 'discipline' do
      create_field(folder, :discipline)
      expect(folder.all_documents.pluck(:id)).to eql([doc1.id])
    end

    it 'document_type' do
      create_field(folder, :document_type)
      expect(folder.all_documents.pluck(:id)).to eql([doc1.id])
    end

    it 'document_number' do
      create_field(folder, :document_number)
      expect(folder.all_documents.pluck(:id)).to eql([doc1.id])
    end
  end

  context 'validates document_fields_values' do
    let(:convention) { FactoryBot.create(:convention) }
    let(:project) { convention.project }
    let(:user) { FactoryBot.create(:user) }
    let(:folder) { FactoryBot.build(:document_folder, project: project, user: user) }

    def set_field(kind)
      convention_field = convention.document_fields.find_by(codification_kind: kind)
      @convention_field_value = convention_field.document_field_values.first.value
      @field =
        folder.document_fields.new(kind: :codification_field,
                                   codification_kind: kind,
                                   column: 1,
                                   value: '111')
    end

    it 'originating_company' do
      expect(folder).to be_valid
      set_field(:originating_company)
      expect(folder).to_not be_valid
      @field.value = @convention_field_value
      expect(folder).to be_valid
    end

    it 'discipline' do
      expect(folder).to be_valid
      set_field(:discipline)
      expect(folder).to_not be_valid
      @field.value = @convention_field_value
      expect(folder).to be_valid
    end

    it 'document_type' do
      expect(folder).to be_valid
      set_field(:document_type)
      expect(folder).to_not be_valid
      @field.value = @convention_field_value
      expect(folder).to be_valid
    end
  end
end
