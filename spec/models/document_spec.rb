require 'rails_helper'

RSpec.describe Document, type: :model do
  it '#build_from_convention' do
    convention = FactoryBot.create(:convention)
    user = FactoryBot.create(:user)
    convention.document_fields.each do |field|
      field.document_rights.create(user: user, document_field_value: field.document_field_values.first, limit_for: :value)
    end
    document = Document.build_from_convention(convention, user)
    expect(document['document_fields_attributes'].length).to eql(4)
    expect(document['document_fields_attributes'].first['document_field_values_attributes'].length).to eql(1)
  end

  it 'attach files' do
    doc = FactoryBot.create(:document)
    doc.native_file.attach(io: File.new(fixture('test.txt')), filename: 'test.txt')
    expect(doc.native_file.download.strip).to eql('111')
  end
end
