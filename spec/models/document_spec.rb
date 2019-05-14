require 'rails_helper'

RSpec.describe Document, type: :model do
  subject { FactoryBot.build(:document) }

  it { should be_valid }

  it '#build_from_convention' do
    convention = FactoryBot.create(:convention)
    user = FactoryBot.create(:user)
    convention.document_fields.each do |field|
      if field.can_limit_by_value?
        field.document_rights.create(user: user,
                                     document_field_value:
                                      field.document_field_values.first,
                                     limit_for: :value,
                                     enabled: true)
      else
        field.document_rights.create(user: user, limit_for: :field)
      end
    end
    document = Document.build_from_convention(convention, user)
    expect(document['document_fields_attributes'].length).to eql(8)
    expect(document['document_fields_attributes'].first['document_field_values_attributes'].length).to eql(1)
  end

  it 'upload field' do
    doc = FactoryBot.create(:document)
    field = doc.document_fields.create(kind: :upload_field)
    field.files.attach(fixture_file_upload('test.txt'))
    expect(field.files.first.download.strip).to eql('111')
  end

  it '#additional_information' do
    field =
      FactoryBot.attributes_for(:document_field,
                                kind: :codification_field,
                                codification_kind: :additional_information,
                                value: '111')
    rev1 = FactoryBot.create(:document_revision, revision_number: '1')
    doc1 = FactoryBot.create(:document, revision: rev1)
    doc1.document_fields.create(field)
    rev2 = FactoryBot.create(:document_revision, revision_number: '2')
    doc2 = FactoryBot.create(:document, revision: rev2)
    doc2.document_fields.create(field)
    rev3 = FactoryBot.create(:document_revision, revision_number: '3')
    doc3 = FactoryBot.create(:document, revision: rev3)
    field['value'] = '222'
    doc3.document_fields.create(field)
    rev2.update_columns(document_main_id: rev1.document_main.id)
    rev3.update_columns(document_main_id: rev1.document_main.id)
    attrs = doc3.attributes_for_show
    info = attrs['additional_information']
    expect(info.length).to eql(2)
    first_info = info.detect{ |i| i[:min] == '1' }
    second_info = info.detect{ |i| i[:min] == '3' }
    expect(first_info[:max]).to eql('2')
    expect(first_info[:value]).to eql('111')
    expect(second_info[:max]).to eql('3')
    expect(second_info[:value]).to eql('222')
  end
end
