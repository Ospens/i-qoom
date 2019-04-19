require 'rails_helper'

RSpec.describe DocumentVersion, type: :model do
  it '#order_by_revision_version' do
    rev = FactoryBot.create(:document_revision)
    ver1 = FactoryBot.create(:document_version, revision: rev)
    ver2 = FactoryBot.create(:document_version, revision: rev)
    ver3 = FactoryBot.create(:document_version, revision: rev)
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 3)
    ver1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 1)
    ver1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 2)
    ver2.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 2)
    ver2.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 1)
    ver3.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 3)
    ver3.document_fields << field
    expect(rev.versions.order_by_revision_version.first).to eql(ver3)
    expect(rev.versions.last_version).to eql(ver1)
  end
end
