require 'rails_helper'

RSpec.describe DocumentRevision, type: :model do
  it 'has versions' do
    rev = FactoryBot.create(:document_revision)
    ver = FactoryBot.create(:document_version, revision: rev)
    expect(ver.revision).to eq(rev)
    expect(rev.versions).to eq([ver])
  end

  it '#order_by_revision_number' do
    main = FactoryBot.create(:document_main)
    rev1 = FactoryBot.create(:document_revision, document_main: main)
    rev2 = FactoryBot.create(:document_revision, document_main: main)
    rev3 = FactoryBot.create(:document_revision, document_main: main)
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 1)
    rev1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 3)
    rev1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 2)
    rev2.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 3)
    rev3.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 1)
    rev3.document_fields << field
    expect(main.revisions.order_by_revision_number.first).to eql(rev3)
    expect(main.revisions.last_revision).to eql(rev1)
  end
end
