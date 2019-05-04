require 'rails_helper'

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

  it '#new' do
    get "/api/v1/projects/#{project.id}/documents/new", headers: credentials(user)
    expect(response).to have_http_status(:success)
    expect(json['document_fields_attributes'].count).to eql(6)
  end

  it '#create' do
    title = Faker::Lorem.sentence
    post "/api/v1/projects/#{project.id}/documents", params: { document: { email_title: title } }, headers: credentials(user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#create_revision' do
    title = Faker::Lorem.sentence
    rev = FactoryBot.create(:document_revision)
    main = rev.document_main
    main.update(project: project)
    document = FactoryBot.create(:document, email_title: title, revision: rev)
    post "/api/v1/documents/#{document.id}/create_revision", params: { document: { email_title: title } }, headers: credentials(user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
    expect(main.revisions.count).to eql(2)
  end

  it '#edit' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    get "/api/v1/documents/#{document.id}/edit", headers: credentials(document.user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  it '#update' do
    title = Faker::Lorem.sentence
    document = FactoryBot.create(:document, email_title: title)
    patch "/api/v1/documents/#{document.id}", params: { document: { email_title: title } }, headers: credentials(document.user)
    expect(response).to have_http_status(:success)
    expect(json['email_title']).to eql(title)
  end

  context '#index' do
    before do
      rev1 = FactoryBot.create(:document_revision)
      @project = rev1.document_main.project
      convention = FactoryBot.create(:convention, project: @project)
      convention.document_fields.each do |field|
        if field.document_number? || field.revision_date?
          field.update(value: rand(1000..9999))
        end
        field.document_field_values.first.update(selected: true)
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
      revision_number = doc_attrs['document_fields_attributes'].detect{ |i| i['codification_kind'] == 'revision_number' }
      revision_number['value'] = '1'
      @doc1 = rev1.versions.create!(doc_attrs.merge(user_id: user.id, project_id: @project.id))
      revision_number['value'] = '2'
      rev2 = FactoryBot.create(:document_revision, document_main: rev1.document_main)
      @doc2 = rev2.versions.create!(doc_attrs.merge(user_id: user.id, project_id: @project.id))
    end

    it 'latest revision and latest version' do
      get "/api/v1/projects/#{@project.id}/documents", headers: credentials(user)
      expect(json[0]['id']).to eql(@doc2.id)
      expect(json[0]['document_fields'].length).to eql(7)
      expect(json.length).to eql(1)
    end

    it 'all revisions and latest version of each revision' do
      @project.dms_settings.create(name: 'show_all_revisions', value: 'true', user: user)
      get "/api/v1/projects/#{@project.id}/documents", headers: credentials(user)
      expect(json[0]['id']).to eql(@doc1.id)
      expect(json[0]['document_fields'].length).to eql(7)
      expect(json[1]['id']).to eql(@doc2.id)
      expect(json.length).to eql(2)
    end
  end
end
