require 'rails_helper'

RSpec.describe Document, type: :model do
  it '#build_from_convention' do
    convention = FactoryBot.create(:convention)
    user = FactoryBot.create(:user)
    convention.document_fields.each do |field|
      if field.can_limit_by_value?
        field.document_rights.create(user: user, document_field_value: field.document_field_values.first, limit_for: :value)
      else
        field.document_rights.create(user: user, limit_for: :field)
      end
    end
    document = Document.build_from_convention(convention, user)
    expect(document['document_fields_attributes'].length).to eql(7)
    expect(document['document_fields_attributes'].first['document_field_values_attributes'].length).to eql(1)
  end

  it 'upload field' do
    doc = FactoryBot.create(:document)
    field = doc.document_fields.create(kind: :upload_field)
    field.files.attach(io: File.new(fixture('test.txt')), filename: 'test.txt')
    expect(field.files.first.download.strip).to eql('111')
  end

  it '#revisions' do
    convention = FactoryBot.create(:convention)
    project = convention.project
    convention2 = FactoryBot.create(:convention)
    user = FactoryBot.create(:user)
    [convention, convention2].each do |con|
      con.document_fields.each do |field|
        field.update(value: Faker::Name.initials(3))
        field.document_field_values.first.update(selected: true)
        if field.can_limit_by_value?
          field.document_rights.create(user: user, document_field_value: field.document_field_values.first, limit_for: :value)
        else
          field.document_rights.create(user: user, limit_for: :field)
        end
      end
    end
    document_attrs1 = Document.build_from_convention(convention, user)
    document_attrs2 = Document.build_from_convention(convention2, user)
    document_attrs1['document_fields_attributes'].find { |i| i['codification_kind'] == 'revision_number' }['value'] = '0'
    document1 = project.documents.create!(document_attrs1.merge(user: user))
    document_attrs1['document_fields_attributes'].find { |i| i['codification_kind'] == 'revision_number' }['value'] = '1'
    document2 = project.documents.create!(document_attrs1.merge(user: user))
    document_attrs2['document_fields_attributes'].find { |i| i['codification_kind'] == 'revision_number' }['value'] = '0'
    document3 = project.documents.create!(document_attrs2.merge(user: user))
    expect(project.documents.count).to eql(3)
    expect(document1.revisions.pluck(:id)).to include(document2.id)
    expect(project.documents.pluck(:id)).to include(document3.id)
    expect(document1.revisions.pluck(:id)).to_not include(document3.id)
  end

  it '#order_by_revision_number' do
    document1 = FactoryBot.create(:document)
    document2 = FactoryBot.create(:document)
    document3 = FactoryBot.create(:document)
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 1)
    document1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 3)
    document1.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 2)
    document2.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_version, value: 3)
    document3.document_fields << field
    field = FactoryBot.create(:document_field, kind: :codification_field, codification_kind: :revision_number, value: 1)
    document3.document_fields << field
    expect(Document.all.order_by_revision_number.first).to eql(document3)
  end
end
