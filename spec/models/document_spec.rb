require 'rails_helper'

RSpec.describe Document, type: :model do
  it '#build_from_convention' do
    convention = FactoryBot.create(:convention)
    document = Document.build_from_convention(convention)
    expect(document.document_fields.length).to eql(4)
  end

  it 'attach files' do
    doc = FactoryBot.create(:document)
    doc.native_file.attach(io: File.new(fixture('test.txt')), filename: 'test.txt')
    expect(doc.native_file.download.strip).to eql('111')
  end
end
