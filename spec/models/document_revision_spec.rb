require 'rails_helper'

RSpec.describe DocumentRevision, type: :model do
  it 'has versions' do
    ver = FactoryBot.create(:document)
    rev = ver.revision
    expect(ver.revision).to eq(rev)
    expect(rev.versions).to eq([ver])
  end

  it '#order_by_revision_number' do
    doc1 = FactoryBot.create(:document)
    rev1 = doc1.revision
    main = rev1.document_main
    field = doc1.document_fields.find_by(codification_kind: :revision_number)
    field.update!(value: 0)
    rev2 = FactoryBot.create(:document_revision, document_main: main)
    doc_attrs = assign_attributes_suffix_to_document(doc1.attributes_for_edit)
    doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }['value'] = '1'
    doc2 = rev2.versions.create!(doc_attrs)
    rev3 = FactoryBot.create(:document_revision, document_main: main)
    doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }['value'] = '2'
    doc3 = rev3.versions.create!(doc_attrs)
    expect(main.revisions.order_by_revision_number.first).to eql(rev1)
    expect(main.revisions.last_revision).to eql(rev3)
  end

  it '#can_update_review_status?' do
    user = FactoryBot.create(:user)
    doc = FactoryBot.create(:document)
    rev = doc.revision
    expect(rev.can_update_review_status?(user)).to eql(false)
    owner = doc.project
               .document_review_owners
               .create!(user: user, originating_company: '111')
    expect(rev.can_update_review_status?(user)).to eql(false)
    value =
      doc.document_fields.find_by(codification_kind: :originating_company)
                         .document_field_values.find_by(selected: true).value
    owner.update!(originating_company: value)
    expect(rev.can_update_review_status?(user)).to eql(true)
  end
end
