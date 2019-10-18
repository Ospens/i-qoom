require 'rails_helper'

RSpec.describe Document, type: :model do
  subject { FactoryBot.build(:document) }

  it { should be_valid }

  it '#build_from_convention' do
    user = FactoryBot.create(:user)
    document = document_attributes(user)
    expect(Document.new(document)).to be_valid
    expect(document['document_fields_attributes'].length).to eql(8)
    expect(document['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values_attributes'].length).to eql(1)
  end

  it 'project creator should have access to all fields and values even without rights' do
    user = FactoryBot.create(:user)
    document = document_attributes(user)
    project = Project.find(document['project_id'])
    document = Document.build_from_convention(project.conventions.active, project.user)
    field = document['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }
    expect(field).to be_present
    expect(field['document_field_values'].length).to eql(1)
  end

  it 'upload field' do
    doc = FactoryBot.create(:document)
    field = doc.document_fields.create(kind: :upload_field)
    field.file.attach(fixture_file_upload('test.txt'))
    expect(field.file.download.strip).to eql('111')
  end

  it 'return filename' do
    user = FactoryBot.create(:user)
    document = Document.create(document_attributes(user))
    field1 =
      document.document_fields.find_by(codification_kind: :document_native_file)
    field2 =
      document.attributes_for_edit['document_fields']
              .detect{ |i| i['codification_kind'] == 'document_native_file' }
    expect(field2['filename']).to eql(field1.file.filename.to_s)
  end

  it '#additional_information' do
    doc1 = FactoryBot.create(:document)
    doc1.revision.update!(revision_number: '1')
    doc1.document_fields.find_by(codification_kind: :additional_information).update!(value: '111')
    doc2 = FactoryBot.create(:document)
    doc2.revision.update!(revision_number: '2')
    doc2.document_fields.find_by(codification_kind: :additional_information).update!(value: '111')
    doc3 = FactoryBot.create(:document)
    doc3.revision.update!(revision_number: '3')
    doc3.document_fields.find_by(codification_kind: :additional_information).update!(value: '222')
    doc2.revision.update_columns(document_main_id: doc1.revision.document_main.id)
    doc3.revision.update_columns(document_main_id: doc1.revision.document_main.id)
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
    field_value1 = field1.document_field_values.find_by(selected: true)
    field_value1.update(value: Faker::Name.initials)
    field2 = doc1.document_fields.find_by(codification_kind: :discipline)
    field_value2 = field2.document_field_values.find_by(selected: true)
    field_value2.update(value: Faker::Name.initials)
    ids = Document.all.filter_by_codification_kind_and_value(:originating_company, field_value1.value)
    ids = ids.filter_by_codification_kind_and_value(:discipline, field_value2.value).pluck(:id)
    expect(ids).to eql([doc1.id])
    field2 = doc2.document_fields.find_by(codification_kind: :originating_company)
    field_value2 = field2.document_field_values.find_by(selected: true)
    field_value2.update(value: Faker::Name.initials)
    ids = Document.all.filter_by_codification_kind_and_value(:originating_company, [field_value1.value, field_value2.value]).pluck(:id)
    expect(ids).to match_array([doc1.id, doc2.id])
  end

  it 'can_view?' do
    user = FactoryBot.create(:user)
    document = document_attributes(user)
    convention = Convention.find(document['convention_id'])
    con_field =
      convention.document_fields.find_by(codification_kind: :originating_company)
    con_value =
      con_field.document_field_values
               .create(value: Faker::Name.initials,
                       position: 1,
                       title: '')
    field = document['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'originating_company' }
    field['document_field_values_attributes'] << con_value.attributes.except('id')
    doc = Document.new(document)
    doc.save!
    expect(doc.can_view?(user)).to eql(true)
    field = doc.document_fields.find_by(codification_kind: :originating_company)
    field_true = field.document_field_values.find_by(selected: true)
    field_false = field.document_field_values.find_by(selected: false)
    field_true.update_columns(selected: false)
    field_false.update_columns(selected: true)
    expect(doc.reload.can_view?(user)).to eql(false)
    doc.project.members.create!(user: user,
                                dms_module_master: true,
                                employment_type: :employee)
    expect(doc.can_view?(user)).to eql(true)

  end

  it 'can_create?' do
    user = FactoryBot.create(:user)
    document = document_attributes(user)
    doc = Document.new(document)
    expect(doc.can_create?(user)).to eql(true)
    DocumentRight.destroy_all
    expect(doc.can_create?(user)).to eql(false)
    doc.project.members.create!(user: user,
                                dms_module_master: true,
                                employment_type: :employee)
    expect(doc.can_create?(user)).to eql(true)
  end

  context 'prevent update of fields and values from convention' do
    let(:user) { FactoryBot.create(:user) }
    let(:doc_attrs) do
      document_attributes(user)
    end

    it 'expect document to be valid' do
      doc = Document.new(doc_attrs)
      expect(doc).to be_valid
    end

    # it 'removes one field' do
    #   attrs = doc_attrs
    #   attrs['document_fields_attributes'].delete_at(1)
    #   doc = Document.new(attrs)
    #   expect(doc).to_not be_valid
    #   expect(doc.errors.count).to eql(2)
    # end

    it 'adds one field' do
      attrs = doc_attrs
      attrs['document_fields_attributes'] << FactoryBot.attributes_for(:document_field)
      doc = Document.new(attrs)
      expect(doc).to_not be_valid
      expect(doc.errors.count).to eql(1)
    end

    it 'removes valid field and adds invalid field' do
      attrs = doc_attrs
      attrs['document_fields_attributes'].delete_at(1)
      attrs['document_fields_attributes'] << FactoryBot.attributes_for(:document_field)
      doc = Document.new(attrs)
      expect(doc).to_not be_valid
      expect(doc.errors.count).to eql(1)
    end

    context 'changes attribute of field' do
      attrs =
        [ 'kind', 'codification_kind', 'column', 'row',
          'required', 'multiselect', 'title', 'command' ]

      let!(:field) do
        doc = Document.create(doc_attrs)
        value = Faker::Name.initials
        field = FactoryBot.build(:document_field, kind: :text_field, title: value)
        @attrs = doc_attrs
        Project.find(@attrs['project_id']).conventions.active.document_fields << field
        field.document_rights.create!(user: user, limit_for: :field, enabled: true)
        field_attrs = field.build_for_new_document(user)
        @attrs['document_fields_attributes'] << field_attrs
        fields = @attrs['document_fields_attributes']
        fields.compact.detect{ |i| i['kind'] == 'text_field' && i['title'] == value }
      end

      attrs.each do |attribute|
        it attribute do
          doc = Document.new(@attrs)
          expect(doc).to be_valid
          old_value = field[attribute]
          field[attribute] =
            if attribute == 'kind'
              'textarea_field'
            elsif attribute == 'codification_kind'
              field['value'] = '1000'
              'document_number'
            elsif attribute == 'column' || attribute == 'row'
              if field[attribute] == 1
                '2'
              elsif field[attribute] == 2
                '1'
              else
                rand(100..999)
              end
            elsif attribute == 'required'
              !field[attribute]
            else
              Faker::Name.initials(number: 9)
            end
          expect(field[attribute]).to_not eql(old_value)
          doc = Document.new(@attrs)
          expect(doc).to_not be_valid
          expect(doc.errors.count).to eql(1)
        end
      end
    end

    it 'adds value to field' do
      attrs = doc_attrs
      fields = attrs['document_fields_attributes']
      field = fields.detect{ |i| i['kind'] == 'select_field' }
      field['document_field_values_attributes'] << FactoryBot.attributes_for(:document_field_value)
      doc = Document.new(attrs)
      expect(doc).to_not be_valid
      expect(doc.errors.count).to eql(1)
    end

    it 'replaces value with wrong value' do
      attrs = doc_attrs
      fields = attrs['document_fields_attributes']
      field = fields.detect{ |i| i['kind'] == 'select_field' }
      field['document_field_values_attributes'] = [FactoryBot.attributes_for(:document_field_value, selected: true)]
      doc = Document.new(attrs)
      expect(doc).to_not be_valid
      expect(doc.errors.count).to eql(1)
    end

    context 'changes attribute of field value' do
      attrs = [ 'value', 'title', 'position' ]

      let!(:field_value) do
        @attrs = doc_attrs
        fields = @attrs['document_fields_attributes']
        field = fields.detect{ |i| i['codification_kind'] == 'originating_company' }
        field['document_field_values_attributes'].first
      end

      attrs.each do |attribute|
        it attribute do
          doc = Document.new(@attrs)
          expect(doc).to be_valid
          old_value = field_value[attribute]
          field_value[attribute] =
            if attribute == 'position'
              rand(100..999)
            else
              Faker::Name.initials(number: 9)
            end
          expect(field_value[attribute]).to_not eql(old_value)
          doc = Document.new(@attrs)
          expect(doc).to_not be_valid
          expect(doc.errors.count).to eql(1)
        end
      end

      it 'title' do
        doc = Document.new(@attrs)
        expect(doc).to be_valid
        Convention.find(@attrs['convention_id']).document_fields.find_by(codification_kind: :originating_company).document_field_values.first.update!(title: nil)
        field_value['title'] = nil
        doc = Document.new(@attrs)
        expect(doc).to be_valid
      end
    end
  end

  it 'assign convention' do
    user = FactoryBot.create(:user)
    document = document_attributes(user)
    document['convention_id'] = nil
    doc = Document.new(document)
    expect(doc.convention).to be_blank
    doc.valid?
    expect(doc.convention).to be_present
    con1 = doc.project.conventions.active
    expect(doc.convention).to eql(con1)
    doc.save!
    con_attrs = assign_attributes_suffix_to_document(con1.attributes_for_edit)
    con2 = doc.project.conventions.create!(con_attrs)
    doc2_attrs = assign_attributes_suffix_to_document(doc.attributes_for_edit)
    doc2 = doc.revision.versions.create!(doc2_attrs)
    expect(doc2.convention).to eql(con1)
  end

  it 'send emails' do
    email1 = Faker::Internet.email
    email2 = Faker::Internet.email
    subject.emails = [email1, email2]
    dbl = double
    expect(ApplicationMailer).to\
      receive(:new_document).with(instance_of(Document), email1).and_return(dbl)
    expect(dbl).to receive(:deliver_later)
    expect(ApplicationMailer).to\
      receive(:new_document).with(instance_of(Document), email2).and_return(dbl)
    expect(dbl).to receive(:deliver_later)
    subject.save!
  end

  it '#prevent_update_of_previous_revisions' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    doc1 = Document.create(attrs)
    edit_attrs = assign_attributes_suffix_to_document(doc1.attributes_for_edit)
    doc2 = doc1.revision.versions.new(edit_attrs)
    expect(doc2).to be_valid
    doc1.revision.document_main.revisions.create
    doc3 = doc1.revision.versions.new(edit_attrs)
    expect(doc3).to_not be_valid
  end

  it '#prevent_update_of_revision_number' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    doc1 = Document.create(attrs)
    edit_attrs = assign_attributes_suffix_to_document(doc1.attributes_for_edit)
    doc2 = doc1.revision.versions.new(edit_attrs)
    expect(doc2).to be_valid
    field = edit_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
    field['value'] = field['value'].to_i + 1
    doc3 = doc1.revision.versions.new(edit_attrs)
    expect(doc3).to_not be_valid
  end

  it '#set_review_status_in_document_main' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    attrs['review_status'] = 'issued_for_approval'
    attrs['reviewers'] = [FactoryBot.create(:user).id]
    attrs['review_issuers'] = [FactoryBot.create(:user).id]
    doc = Document.create!(attrs)
    expect(doc.revision.document_main).to be_issued_for_approval
  end

  it '#review_status_value' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    attrs['reviewers'] = [FactoryBot.create(:user).id]
    attrs['review_issuers'] = [FactoryBot.create(:user).id]
    doc = Document.new(attrs)
    expect(doc).to be_valid
    doc.review_status = 'in_progress'
    expect(doc).to_not be_valid
    doc.review_status = 'issued_for_review'
    expect(doc).to be_valid
    doc.review_status = 'accepted'
    expect(doc).to_not be_valid
    doc.review_status = 'issued_for_review'
    expect(doc).to be_valid
    doc.review_status = 'rejected'
    expect(doc).to_not be_valid
    doc.review_status = 'issued_for_information'
    expect(doc).to be_valid
  end

  it 'set_reviewers_and_review_issuers_in_document_main' do
    user1 = FactoryBot.create(:user)
    user2 = FactoryBot.create(:user)
    user3 = FactoryBot.create(:user)
    attrs = document_attributes(user1)
    attrs['review_status'] = 'issued_for_approval'
    attrs['reviewers'] = [user2.id]
    attrs['review_issuers'] = [user3.id]
    doc = Document.create!(attrs)
    main = doc.document_main
    expect(main.reviewers.pluck(:id)).to eql([user2.id])
    expect(main.review_issuers.pluck(:id)).to eql([user3.id])
  end

  it 'validates reviewers and review issuers length' do
    user1 = FactoryBot.create(:user)
    user2 = FactoryBot.create(:user)
    user3 = FactoryBot.create(:user)
    attrs = document_attributes(user1)
    attrs['review_status'] = 'issued_for_information'
    expect(Document.new(attrs)).to be_valid
    ['issued_for_approval', 'issued_for_review'].each do |status|
      attrs = document_attributes(user1)
      attrs['review_status'] = status
      expect(Document.new(attrs)).to_not be_valid
      attrs['reviewers'] = [user2.id]
      expect(Document.new(attrs)).to_not be_valid
      attrs['review_issuers'] = [user3.id]
      expect(Document.new(attrs)).to be_valid
    end
  end

  it 'codification_string' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    doc = Document.new(attrs)
    doc.document_main.update(project_code: 'AAA')
    codes = doc.codification_string
    fields = doc.document_fields
    value1 =
      fields.detect{ |i| i['codification_kind'] == 'originating_company' }
        .document_field_values.detect{ |i| i['selected'] == true }.value
    value2 =
      fields.detect{ |i| i['codification_kind'] == 'discipline' }
        .document_field_values.detect{ |i| i['selected'] == true }.value
    value3 =
      fields.detect{ |i| i['codification_kind'] == 'document_type' }
        .document_field_values.detect{ |i| i['selected'] == true }.value
    value4 =
      fields.detect{ |i| i['codification_kind'] == 'document_number' }.value
    string = "AAA-#{value1}-#{value2}-#{value3}-#{value4}"
    expect(codes).to eql(string)
  end

  it 'attributes_for_edit' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    doc = Document.create(attrs)
    attrs = doc.attributes_for_edit
    expect(attrs['revision_version']).to be_present
  end

  it 'attributes_for_show' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    doc = Document.create(attrs)
    expect(doc).to receive(:attributes_for_edit).and_call_original
    doc.attributes_for_show
  end

  it 'validates document number' do
    user = FactoryBot.create(:user)
    attrs = document_attributes(user)
    field =
      attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'document_number' }
    field['value'] = '10000'
    expect(Document.new(attrs)).to_not be_valid
    field['value'] = 'AAA'
    expect(Document.new(attrs)).to_not be_valid
    field['value'] = '9999'
    expect(Document.new(attrs)).to be_valid
    field['value'] = '0000'
    expect(Document.new(attrs)).to be_valid
  end

  it '#values_for_filters' do
    values = Document.all.values_for_filters(codification_kind: :originating_company)
    expect(values.length).to eql(0)
    FactoryBot.create(:document)
    values = Document.all.values_for_filters(codification_kind: :originating_company)
    expect(values.length).to eql(1)
    expect(values.first.first).to eql('---')
    expect(values.first.last).to eql('Originating company')
  end
end
