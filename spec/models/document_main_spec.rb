require 'rails_helper'

RSpec.describe DocumentMain, type: :model do
  it 'has revisions' do
    main = FactoryBot.create(:document_main)
    rev = FactoryBot.create(:document_revision, document_main: main)
    expect(main.revisions).to eq([rev])
    expect(rev.document_main).to eq(main)
  end

  it '#documents_available_for' do
    user = FactoryBot.create(:user)
    project = FactoryBot.create(:project)
    docs = project.document_mains.documents_available_for(user)
    expect(docs.class.name).to eql('ActiveRecord::Relation')
    expect(docs.count).to eql(0)
    attrs = document_attributes(user)
    doc1 = Document.create!(attrs)
    attrs = assign_attributes_suffix_to_document(doc1.attributes_for_edit)
    doc2 = doc1.revision.versions.create!(attrs)
    rev = doc1.revision.document_main.revisions.create
    attrs = doc1.attributes_for_edit
    revision_number =
      attrs['document_fields'].detect do |i|
        i['codification_kind'] == 'revision_number'
      end
    revision_number['value'] = '2'
    doc3 = rev.versions.create!(assign_attributes_suffix_to_document(attrs))
    docs = doc1.project.document_mains.documents_available_for(user)
    expect(docs.class.name).to eql('ActiveRecord::Relation')
    expect(docs.count).to eql(1)
    doc1.project.dms_settings.create(name: 'show_all_revisions',
                                     value: 'true',
                                     user: user)
    docs = doc1.project.document_mains.documents_available_for(user)
    expect(docs.count).to eql(2)
  end
end
