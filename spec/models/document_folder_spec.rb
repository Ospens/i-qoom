require 'rails_helper'

RSpec.describe DocumentFolder, type: :model do
  context 'all_documents' do
    let(:folder) { FactoryBot.create(:document_folder) }
    let(:project) { folder.project }
    let(:user) { folder.user }
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
      field.update(value: Faker::Name.initials)
      value = field.value
      main_kind =
        if kind == :document_number
          field.update!(value: '1001')
          value = '1001'
          :text_field
        else
          :select_field
        end
      folder.document_fields.create!(kind: main_kind,
                                     codification_kind: field.codification_kind,
                                     value: value)
    end

    it 'documents' do
      dbl = double
      allow(project).to receive(:document_mains).and_return(dbl)
      allow(dbl).to receive(:documents_available_for).with(user).and_return([])
      folder.document_mains << doc1.revision.document_main
      allow_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
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

  context 'allowed_to_add_document?' do
    let!(:folder) { FactoryBot.create(:document_folder) }
    let(:project) { folder.project }
    let(:user) { folder.user }
    let!(:doc) { FactoryBot.create(:document) }

    it do
      dbl = double
      allow(project).to receive(:document_mains).and_return(dbl)
      allow(dbl).to receive(:documents_available_for).with(user).and_return([])
      expect(folder.allowed_to_add_document?(doc, user)).to eql(false)
      allow(dbl).to receive(:documents_available_for).with(user).and_return([doc])
      expect(folder.allowed_to_add_document?(doc, user)).to eql(true)
    end
  end

  it '#document_fields_presence' do
    folder = FactoryBot.build(:document_folder)
    expect(folder).to be_valid
    folder.document_fields.new(FactoryBot.attributes_for(:document_field))
    expect(folder).to_not be_valid
    folder.document_fields.delete_all
    folder.build_default_fields
    expect(folder.document_fields.length).to eql(4)
    expect(folder).to be_valid
  end
end
