require 'rails_helper'
require 'zip'

describe Document, type: :request do
  let(:json) { JSON(response.body) }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project) }
  let!(:convention) do
    convention = FactoryBot.create(:convention, project: project)
    convention.document_fields.limit_by_value.each do |field|
      field.document_rights
           .create(user: user,
                   limit_for: :value,
                   document_field_value: field.document_field_values.first,
                   enabled: true)
    end
    convention
  end

  def credentials(user)
    session = Session.new(login: user.email, password: user.password)
    { 'Authorization' => session.auth_token }
  end

  context '#new' do
    it 'anon' do
      get "/api/v1/projects/#{project.id}/documents/new"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/documents/new", headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      get "/api/v1/projects/#{project.id}/documents/new", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['document_fields_attributes'].count).to eql(8)
    end

    it 'project user' do
      get "/api/v1/projects/#{project.id}/documents/new", headers: credentials(project.user)
      expect(response).to have_http_status(:success)
    end
  end

  context '#create' do
    let(:title) { Faker::Lorem.sentence }

    before do
      @params = { document: document_attributes(user) }
      @params[:document]['email_title'] = title
      @project_id = @params[:document]['project_id']
      @project_user = Project.find(@project_id).user
      @project_user.password = 'password1'
    end

    it 'anon' do
      post "/api/v1/projects/#{@project_id}/documents", params: @params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{@project_id}/documents", params: @params, headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      post "/api/v1/projects/#{@project_id}/documents", params: @params, headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['email_title']).to eql(title)
    end

    it 'project user' do
      post "/api/v1/projects/#{@project_id}/documents", params: @params, headers: credentials(@project_user)
      expect(response).to have_http_status(:success)
    end
  end

  it 'uploads files' do
    document_params = document_attributes(user)
    document_native_file =
      document_params['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'document_native_file' }
    document_native_file['files'] = [fixture_file_upload('test.txt')]
    revision_number = document_params['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
    revision_number['value'] = '0'
    file1 = fixture_file_upload('test.txt')
    file2 = fixture_file_upload('test.txt')
    field = FactoryBot.attributes_for(:document_field, kind: :upload_field, title: 'title')
    project = Project.find(document_params['project_id'])
    project.conventions.active.document_fields.create!(field)
    field['files'] = [file1, file2]
    document_params['document_fields_attributes'] << field
    post "/api/v1/projects/#{project.id}/documents", params: { document: document_params }, headers: credentials(user)
    expect(response).to have_http_status(:success)
    files = Document.last.document_fields.find_by(title: 'title').files
    file1 = files.first
    file2 = files.last
    expect(files.length).to eql(2)
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
      document_native_file =
        doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'document_native_file' }
      document_native_file['files'] = [fixture_file_upload('test.txt')]
      revision_number = doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
      revision_number['value'] = '1'
      rev.versions.create!(doc_attrs.merge(user_id: owner.id, project_id: project.id))
    end

    context '#create_revision' do
      let(:attrs) do
        attrs = document.attributes_for_edit
        attrs['email_title'] = title
        revision_number = attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
        revision_number['value'] = '2'
        attrs
      end

      it 'anon' do
        post "/api/v1/documents/#{document.id}/create_revision", params: { document: attrs }
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        post "/api/v1/documents/#{document.id}/create_revision", params: { document: attrs }, headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        post "/api/v1/documents/#{document.id}/create_revision", params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json['email_title']).to eql(title)
        expect(document.revision.document_main.revisions.count).to eql(2)
      end

      it 'owner' do
        post "/api/v1/documents/#{document.id}/create_revision", params: { document: attrs }, headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end

      it 'project user' do
        post "/api/v1/documents/#{document.id}/create_revision", params: { document: attrs }, headers: credentials(project.user)
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
        expect(json['email_title']).to eql(title)
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}/edit", headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end

      it 'project user' do
        get "/api/v1/documents/#{document.id}/edit", headers: credentials(project.user)
        expect(response).to have_http_status(:success)
      end
    end

    context '#update' do
      let(:attrs) { document.attributes_for_edit }

      it 'anon' do
        patch "/api/v1/documents/#{document.id}", params: { document: { email_title: '' } }
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        patch "/api/v1/documents/#{document.id}", params: { document: { email_title: '' } }, headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        patch "/api/v1/documents/#{document.id}", params: { document: attrs }, headers: credentials(user)
        expect(response).to have_http_status(:success)
      end

      it 'owner' do
        attrs['email_title'] = title
        patch "/api/v1/documents/#{document.id}", params: { document: attrs }, headers: credentials(owner)
        expect(response).to have_http_status(:success)
        expect(json['email_title']).to eql(title)
        expect(document.revision.versions.length).to eql(2)
      end

      it 'project user' do
        patch "/api/v1/documents/#{document.id}", params: { document: attrs }, headers: credentials(project.user)
        expect(response).to have_http_status(:success)
      end
    end

    context '#show' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}", headers: credentials(FactoryBot.create(:user))
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

      it 'project user' do
        get "/api/v1/documents/#{document.id}", headers: credentials(project.user)
        expect(response).to have_http_status(:success)
      end
    end

    context '#download_native_file' do
      it 'anon' do
        get "/api/v1/documents/#{document.id}/download_native_file"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/documents/#{document.id}/download_native_file", headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:forbidden)
      end

      it 'user with rights' do
        get "/api/v1/documents/#{document.id}/download_native_file", headers: credentials(user)
        expect(response).to have_http_status(:success)
      end

      it 'owner' do
        get "/api/v1/documents/#{document.id}/download_native_file", headers: credentials(owner)
        expect(response).to have_http_status(:success)
        expect(response.body).to eql("111\n")
        expect(response.header['Content-Disposition']).to include(document.codification_string)
      end

      it 'project user' do
        get "/api/v1/documents/#{document.id}/download_native_file", headers: credentials(project.user)
        expect(response).to have_http_status(:success)
      end
    end

    context '#download_native_files' do
      it 'anon' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files"
        expect(response).to have_http_status(:forbidden)
      end

      it 'user' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files", params: { document_ids: [document.id] }, headers: credentials(FactoryBot.create(:user))
        expect(response).to have_http_status(:success)
      end

      it 'user with rights' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files", params: { document_ids: [document.id] }, headers: credentials(user)
        expect(response).to have_http_status(:success)
        files = Zip::InputStream.open(StringIO.new(response.body))
        file = files.get_next_entry
        expect(file.name).to include(document.codification_string)
        expect(file.get_input_stream.read).to eql("111\n")
        expect(response.header['Content-Disposition']).to include(project.name.underscore)
        expect(files.get_next_entry).to be_nil
      end

      it 'owner' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files", params: { document_ids: [document.id] }, headers: credentials(owner)
        expect(response).to have_http_status(:success)
      end

      it 'project user' do
        get "/api/v1/projects/#{project.id}/documents/download_native_files", params: { document_ids: [document.id] }, headers: credentials(project.user)
        expect(response).to have_http_status(:success)
      end
    end

    it 'download_details' do
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

  context '#index' do
    it 'no documents' do
      get "/api/v1/projects/#{project.id}/documents", headers: credentials(user)
      expect(response).to have_http_status(:success)
    end

    context 'has documents' do
      before do
        rev1 = FactoryBot.create(:document_revision)
        @project = rev1.document_main.project
        convention = FactoryBot.create(:convention, project: @project)
        convention.document_fields.each do |field|
          if field.document_number? || field.revision_date?
            field.update(value: rand(1000..9999))
          end
          if field.select_field?
            field.document_field_values.first.update(selected: true)
          end
          if field.can_limit_by_value?
            field.document_rights.create(user: user,
                                         document_field_value: field.document_field_values.first,
                                         limit_for: :value,
                                         enabled: true)
          else
            field.document_rights.create(user: user, limit_for: :field)
          end
        end
        doc_attrs = Document.build_from_convention(convention, user)
        document_native_file =
          doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'document_native_file' }
        document_native_file['files'] = [fixture_file_upload('test.txt')]
        revision_number = doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
        revision_number['value'] = '1'
        @doc1 = rev1.versions.create!(doc_attrs.merge(user_id: user.id, project_id: @project.id))
        revision_number['value'] = '2'
        rev2 = FactoryBot.create(:document_revision, document_main: rev1.document_main)
        @doc2 = rev2.versions.create!(doc_attrs.merge(user_id: user.id, project_id: @project.id))
      end

      it 'latest revision and latest version' do
        get "/api/v1/projects/#{@project.id}/documents", headers: credentials(user)
        expect(json['originating_companies'].length).to eql(1)
        expect(json['discipline'].length).to eql(1)
        expect(json['document_types'].length).to eql(1)
        expect(json['documents'][0]['id']).to eql(@doc2.id)
        expect(json['documents'][0]['document_fields'].length).to eql(9)
        expect(json['documents'].length).to eql(1)
      end

      it 'all revisions and latest version of each revision' do
        @project.dms_settings.create(name: 'show_all_revisions', value: 'true', user: user)
        get "/api/v1/projects/#{@project.id}/documents", headers: credentials(user)
        expect(json['documents'][0]['id']).to eql(@doc1.id)
        expect(json['documents'][0]['document_fields'].length).to eql(9)
        expect(json['documents'][1]['id']).to eql(@doc2.id)
        expect(json['documents'].length).to eql(2)
      end
    end
  end
end
