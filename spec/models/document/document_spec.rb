require 'rails_helper'

RSpec.describe DocumentMain, type: :model do
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
end
