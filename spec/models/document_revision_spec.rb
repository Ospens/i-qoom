require 'rails_helper'

RSpec.describe DocumentRevision, type: :model do
  it 'has versions' do
    rev = FactoryBot.create(:document_revision)
    ver = FactoryBot.create(:document, revision: rev)
    expect(ver.revision).to eq(rev)
    expect(rev.versions).to eq([ver])
  end

  it '#order_by_revision_number' do
    main = FactoryBot.create(:document_main)
    rev1 = FactoryBot.create(:document_revision, document_main: main)
    doc1 = FactoryBot.create(:document, revision: rev1)
    field = FactoryBot.build(:document_field, kind: :text_field, codification_kind: :revision_number, value: 0)
    doc1.document_fields << field
    rev2 = FactoryBot.create(:document_revision, document_main: main)
    doc_attrs = doc1.attributes_for_edit
    doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }['value'] = '1'
    doc2 = rev2.versions.create!(doc_attrs)
    rev3 = FactoryBot.create(:document_revision, document_main: main)
    doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }['value'] = '2'
    doc3 = rev3.versions.create!(doc_attrs)
    expect(main.revisions.order_by_revision_number.first).to eql(rev1)
    expect(main.revisions.last_revision).to eql(rev3)
  end
end
