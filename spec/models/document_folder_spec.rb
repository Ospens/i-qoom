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
end
