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

  it '#filter_by_codification_kind_and_value' do
    doc1 = FactoryBot.create(:document)
    doc2 = FactoryBot.create(:document)
    FactoryBot.create(:document)
    field1 = doc1.document_fields.find_by(codification_kind: :originating_company)
    value1 = field1.document_field_values.find_by(selected: true).value
    ids = Document.all.filter_by_codification_kind_and_value(:originating_company, value1).pluck(:id)
    expect(ids).to eql([doc1.id])
    field2 = doc2.document_fields.find_by(codification_kind: :originating_company)
    value2 = field2.document_field_values.find_by(selected: true).value
    ids = Document.all.filter_by_codification_kind_and_value(:originating_company, [value1, value2]).pluck(:id)
    expect(ids).to match_array([doc1.id, doc2.id])
  end
end
