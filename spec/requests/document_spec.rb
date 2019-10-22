require 'rails_helper'
require 'zip'

describe Document, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project) }
  let!(:convention) do
    convention = project.conventions.active
    convention.document_fields.limit_by_value.each do |field|
      field.document_rights
           .create(user: user,
                   limit_for: :value,
                   document_field_value: field.document_field_values.first,
                   enabled: true)
    end
    convention
  end

  context '#new' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/documents/new"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/documents/new",\
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      get "/api/v1/projects/#{project.id}/documents/new",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['document_fields'].count).to eql(8)
      expect(json['document_fields'].select{ |i| i['kind'] == 'select_field' }.length).to eql(3)
    end
  end

  context '#create' do
    let(:title) { Faker::Lorem.sentence }

    before do
      @params = { document: document_attributes(user, false) }
      @params[:document]['email_title'] = title
      project = get_project_from_document_attrs(@params[:document])
      @project_id = project.id
    end

    it 'anon' do
      post "/api/v1/projects/#{@project_id}/documents", params: @params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{@project_id}/documents",\
        params: @params, headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      @params[:document]['title'] = title
      post "/api/v1/projects/#{@project_id}/documents",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['email_title']).to eql(title)
      expect(json['title']).to eql(title)
      expect(json['document_fields'].select{ |i| i['kind'] == 'select_field' }.length).to eql(3)
    end

    it 'expect DocumentMain is not created if document is invalid' do
      DocumentRevision.destroy_all
      DocumentMain.destroy_all
      @params[:document]['document_fields'].first['kind'] = nil
      post "/api/v1/projects/#{@project_id}/documents",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(DocumentMain.count).to eql(0)
    end

    it 'expect DocumentRevision is not created if document is invalid' do
      DocumentRevision.destroy_all
      @params[:document]['document_fields'].first['kind'] = nil
      post "/api/v1/projects/#{@project_id}/documents",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(DocumentRevision.count).to eql(0)
    end

    it 'emails' do
      @params[:document]['emails'] = [Faker::Internet.email]
      dbl = double
      expect(ApplicationMailer).to receive(:new_document).and_return(dbl)
      expect(dbl).to receive(:deliver_later)
      post "/api/v1/projects/#{@project_id}/documents",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:success)
    end
  end

  it 'uploads file' do
    document_params = document_attributes(user, false)
    document_native_file =
      document_params['document_fields'].detect{ |i| i['codification_kind'] == 'document_native_file' }
    document_native_file['file'] = fixture_file_upload('test.txt')
    file1 = fixture_file_upload('test.txt')
    file2 = fixture_file_upload('test.txt')
    field1 = FactoryBot.attributes_for(:document_field, kind: :upload_field, title: 'title1')
    field2 = FactoryBot.attributes_for(:document_field, kind: :upload_field, title: 'title2')
    project = get_project_from_document_attrs(document_params)
    project.conventions.active.document_fields.create!(field1)
    project.conventions.active.document_fields.create!(field2)
    field1['file'] = file1
    field2['file'] = file2
    document_params['document_fields'] << field1
    document_params['document_fields'] << field2
    post "/api/v1/projects/#{project.id}/documents",\
      params: { document: document_params }, headers: credentials(user)
    expect(response).to have_http_status(:success)
    file1 = Document.last.document_fields.find_by(title: 'title1').file
    file2 = Document.last.document_fields.find_by(title: 'title1').file
    expect(file1.download.strip).to eql('111')
    expect(file2.download.strip).to eql('111')
  end

  context '' do
    let(:title) { Faker::Lorem.sentence }
    let(:owner) { FactoryBot.create(:user) }
    let(:document) do
      rev = FactoryBot.create(:document_revision)
      rev.document_main.update!(project: project)
      convention.document_fields.each do |field|
        if field.document_number? || field.revision_date?
          field.update(value: rand(1000..9999))
        end
        if field.select_field?
          field.document_field_values.first.update(selected: true)
        end
      end
      doc_attrs = Document.build_from_convention(convention, user)
      doc_attrs = assign_attributes_suffix_to_document(doc_attrs)
      doc_attrs['review_status'] = 'issued_for_information'
      document_native_file =
        doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'document_native_file' }
      document_native_file['file'] = fixture_file_upload('test.txt')
      revision_number = doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
      revision_number['value'] = '1'
      rev.versions.create!(doc_attrs.merge(user_id: owner.id))
    end

    context '#create_revision' do
      let(:attrs) do
        attrs = document.attributes_for_edit
        attrs['email_title'] = title
        revision_number = attrs['document_fields'].detect{ |i| i['codification_kind'] == 'revision_number' }
        revision_number['value'] = '2'
        attrs
      end

      it 'anon' do
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs }
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs },\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json['email_title']).to eql(title)
        expect(document.revision.document_main.revisions.count).to eql(2)
      end

      it 'expect DocumentMain is not created if document is invalid' do
        document
        expect(DocumentMain.count).to eql(1)
        attrs['document_fields'].first['kind'] = nil
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(DocumentMain.count).to eql(1)
      end

      it 'expect DocumentRevision is not created if document is invalid' do
        document
        expect(DocumentRevision.count).to eql(1)
        attrs['document_fields'].first['kind'] = nil
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(DocumentRevision.count).to eql(1)
      end

      it 'owner' do
        post "/api/v1/documents/#{document.id}/create_revision",\
          params: { document: attrs }, headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end
    end

    context '#edit' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}/edit"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}/edit", headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        document.update!(email_title: title)
        get "/api/v1/documents/#{document.id}/edit", headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json['document_fields'].select{ |i| i['kind'] == 'select_field' }.length).to eql(3)
        expect(json['email_title']).to eql(title)
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}/edit", headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end
    end

    context '#update' do
      let(:attrs) { document.attributes_for_edit }

      it 'anon' do
        patch "/api/v1/documents/#{document.id}",\
          params: { document: { email_title: '' } }
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        patch "/api/v1/documents/#{document.id}",\
          params: { document: { email_title: '' } },\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        patch "/api/v1/documents/#{document.id}",\
          params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:success)
      end

      it 'owner' do
        attrs['email_title'] = title
        patch "/api/v1/documents/#{document.id}",\
          params: { document: attrs }, headers: credentials(owner)
        expect(response).to have_http_status(:success)
        expect(json['email_title']).to eql(title)
        expect(json['document_fields'].select{ |i| i['kind'] == 'select_field' }.length).to eql(3)
        expect(document.revision.versions.length).to eql(2)
      end
    end

    context '#show' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}",\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        get "/api/v1/documents/#{document.id}", headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json['project_name']).to eql(project.name)
        expect(json['document_id']).to eql(document.codification_string)
        expect(json['username']).to eql({'first_name' => owner.first_name, 'last_name' => owner.last_name})
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}", headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end
    end

    context '#download_native_file' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}/download_native_file"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}/download_native_file",\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        get "/api/v1/documents/#{document.id}/download_native_file",\
          headers: credentials(user)
        expect(response).to have_http_status(:success)
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}/download_native_file",\
          headers: credentials(owner)
        expect(response).to have_http_status(:success)
        expect(response.body).to eql("111\n")
        expect(response.header['Content-Disposition']).to include(document.codification_string)
      end
    end

    context '#download_native_files' do
      it 'anon' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files",\
          params: { document_ids: [document.id] },\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'dms user' do
        project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents/download_native_files",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        files = Zip::InputStream.open(StringIO.new(response.body))
        file = files.get_next_entry
        expect(file.name).to include(document.codification_string)
        expect(file.get_input_stream.read).to eql("111\n")
        expect(response.header['Content-Disposition']).to include(project.name.underscore)
        expect(files.get_next_entry).to be_nil
      end

      it 'dms master' do
        project.members.create!(user: user, dms_module_master: true, employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents/download_native_files",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
      end
    end

    context 'download_details' do
      it do
        document.update(email_title: Faker::Internet.email)
        document.document_fields.find_by(codification_kind: :additional_information).update(value: Faker::Lorem.paragraph)
        get "/api/v1/documents/#{document.id}/download_details", headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(response.header['Content-Disposition']).to include(document.codification_string)
        # File.open('public/document.pdf', 'w+') do |f|
        #   f.binmode
        #   f.write(response.body)
        # end
      end
    end

    context 'download_list' do
      before do
        project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
      end

      it 'csv' do
        get "/api/v1/projects/#{project.id}/documents/download_list.csv",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        sheet = CSV.parse(response.body.force_encoding('utf-8'))
        expect(sheet[0][0]).to eql("\xEF\xBB\xBFDoc-ID")
        expect(sheet[0][1]).to eql('Revision')
        expect(sheet[0][2]).to eql('Version')
        expect(sheet[1][0]).to eql(document.codification_string)
        expect(sheet[1][1]).to eql(document.revision_date)
        expect(sheet[1][2]).to eql(document.revision_version)
        # File.open('public/document.csv', 'w+') do |f|
        #   f.binmode
        #   f.write(response.body)
        # end
      end

      it 'xlsx' do
        get "/api/v1/projects/#{project.id}/documents/download_list.xlsx",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        File.open('./tmp/documents.xlsx', 'w') { |file| file.write(response.body) }
        sheet = Roo::Spreadsheet.open('./tmp/documents.xlsx').sheet(0)
        row1 = sheet.row(1)
        row2 = sheet.row(2)
        expect(row1[0]).to eql('Doc-ID')
        expect(row1[1]).to eql('Revision')
        expect(row1[2]).to eql('Version')
        expect(row2[0]).to eql(document.codification_string)
        expect(row2[1].to_s).to eql(document.revision_date)
        expect(row2[2].to_s).to eql(document.revision_version)
        File.delete('./tmp/documents.xlsx')
      end

      it 'xml' do
        get "/api/v1/projects/#{project.id}/documents/download_list.xml",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        sheet = Nokogiri::XML(response.body).search('documents').search('document')
        expect(sheet.search('doc_id').text).to eql(document.codification_string)
        expect(sheet.search('revision').text).to eql(document.revision_date)
        expect(sheet.search('version').text).to eql(document.revision_version)
      end

      it 'pdf' do
        get "/api/v1/projects/#{project.id}/documents/download_list.pdf",\
          params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        # File.open('./tmp/document.pdf', 'w+') do |f|
        #   f.binmode
        #   f.write(response.body)
        # end
      end
    end

    context '#show' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}/revisions_and_versions"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}/revisions_and_versions",\
          headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        attrs = assign_attributes_suffix_to_document(document.attributes_for_edit)
        doc2 = document.revision.versions.create!(attrs)
        get "/api/v1/documents/#{document.id}/revisions_and_versions", headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(1)
        rev = json.first
        expect(rev['versions'].length).to eql(2)
        expect(rev['versions'].first['id']).to eql(document.id)
        expect(rev['versions'].last['id']).to eql(doc2.id)
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}/revisions_and_versions", headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end
    end
  end

  context '#index' do
    it 'no documents' do
      project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
      get "/api/v1/projects/#{project.id}/documents",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
    end

    context 'has documents' do
      let(:document) { FactoryBot.create(:document) }
      let(:project) { document.project }

      it do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents", headers: credentials(user)
        expect(json['originating_companies'].length).to eql(1)
        expect(json['discipline'].length).to eql(1)
        expect(json['document_types'].length).to eql(1)
        expect(json['documents'][0]['id']).to eql(document.id)
        expect(json['documents'][0]['document_fields'].length).to eql(9)
        expect(json['documents'].length).to eql(1)
      end

      it 'search by valid value' do
        value =
          document.document_fields
                  .find_by(codification_kind: :originating_company)
                  .document_field_values.find_by(selected: true)
                  .value
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents",
          headers: credentials(user),
          params: { originating_companies: [value] }
        expect(json['documents'].length).to eql(1)
      end

      it 'search by invalid value' do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents",
          headers: credentials(user),
          params: { originating_companies: ['AAAA'] }
        expect(json['documents'].length).to eql(0)
      end

      it 'search by title and value' do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents",
          headers: credentials(user),
          params: { filters: [{ title: 'Originating company', value: '---' },
                              { title: 'Discipline', value: '---' }] }
        expect(json['documents'].length).to eql(1)
      end

      it 'search by invalid title and value' do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
        get "/api/v1/projects/#{project.id}/documents",
          headers: credentials(user),
          params: { filters: [{ title: 'Originating company', value: 'AAAA' },
                              { title: 'Discipline', value: '---' }] }
        expect(json['documents'].length).to eql(0)
      end
    end
  end

  it 'revisions' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document)
    document.update(title: title)
    get "/api/v1/documents/#{document.id}/revisions",\
      headers: credentials(document.user)
    expect(response).to have_http_status(:success)
    revision = json.first
    expect(revision['id']).to eql(document.revision.id)
    expect(revision['codification_string']).to eql(document.codification_string)
    expect(revision['title']).to eql(title)
    expect(revision['review_status']).to eql('issued_for_information')
  end

  context '#my_documents' do
    it 'no documents' do
      project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
      get "/api/v1/projects/#{project.id}/documents/my_documents",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json.length).to eql(0)
    end

    it 'has documents' do
      document = FactoryBot.create(:document)
      project = document.project
      project.members.create!(user: document.user, dms_module_access: true, employment_type: :employee)
      get "/api/v1/projects/#{project.id}/documents/my_documents",\
        headers: credentials(document.user)
      expect(json[0]['id']).to eql(document.id)
      expect(json.length).to eql(1)
    end
  end
end
