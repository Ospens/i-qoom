require 'rails_helper'

describe DocumentFolder, type: :request do
  let(:json) { JSON(response.body) }

  context '#create' do
    let(:title) { Faker::Lorem.sentence }
    let(:convention) { FactoryBot.create(:convention) }
    let(:project) { convention.project }
    let(:folder_params) do
      con_field = convention.document_fields
                            .find_by(codification_kind: :originating_company)
      attrs =
        FactoryBot.attributes_for(:document_field,
                                  kind: :select_field,
                                  codification_kind: :originating_company,
                                  value: con_field.document_field_values.first.value)
      { document_folder: {
          title: title,
          project_id: project.id,
          document_fields: [ attrs ] } }
    end
    let(:user) { FactoryBot.create(:user) }

    it 'anon' do
      post '/api/v1/document_folders', params: folder_params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post '/api/v1/document_folders', params: folder_params, headers: credentials(user)
      expect(response).to have_http_status(:success)
      folder = DocumentFolder.first
      expect(folder.title).to eql(title)
      expect(folder.document_fields.length).to eql(1)
      expect(json['document_fields'].length).to eql(1)
      expect(folder.user).to eql(user)
      expect(folder.project).to eql(project)
    end
  end

  context '#edit' do
    let(:document_folder) { FactoryBot.create(:document_folder) }
    let(:user) { document_folder.user }

    it 'anon' do
      get "/api/v1/document_folders/#{document_folder.id}/edit"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/document_folders/#{document_folder.id}/edit", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['title']).to eql(document_folder.title)
    end
  end

  context '#update' do
    let(:document_folder) { FactoryBot.create(:document_folder) }
    let(:user) { document_folder.user }
    let(:title) { Faker::Lorem.sentence }
    let(:folder_params) { { document_folder: { title: title } } }

    it 'anon' do
      patch "/api/v1/document_folders/#{document_folder.id}", params: folder_params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch "/api/v1/document_folders/#{document_folder.id}", params: folder_params, headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['title']).to eql(title)
    end
  end

  context '#show' do
    let(:document_folder) { FactoryBot.create(:document_folder) }
    let(:user) { document_folder.user }
    let!(:document) { FactoryBot.create(:document) }

    it 'anon' do
      get "/api/v1/document_folders/#{document_folder.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      allow(DocumentFolder).to receive(:find).and_return(document_folder)
      allow(document_folder).to receive(:all_documents).and_return(Document.all)
      get "/api/v1/document_folders/#{document_folder.id}", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json[0]['id']).to eql(document.id)
      expect(json[0]['document_fields'].length).to eql(9)
      expect(json[0]['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values'].length).to eql(1)
    end
  end

  context '#add_document_to_folders' do
    let(:document_folder1) { FactoryBot.create(:document_folder) }
    let(:document_folder2) { FactoryBot.create(:document_folder) }
    let(:user) { document_folder1.user }
    let!(:document) { FactoryBot.create(:document) }
    let(:folder_params) { { document_id: document.id, document_folder_ids: DocumentFolder.all.pluck(:id) } }

    it 'anon' do
      post '/api/v1/document_folders/add_document_to_folders', params: folder_params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      allow(DocumentFolder).to receive(:find).and_return(document_folder1)
      allow(document_folder1).to receive(:allowed_to_add_document?).and_return(true)
      post '/api/v1/document_folders/add_document_to_folders', params: folder_params, headers: credentials(user)
      expect(response).to have_http_status(:success)
      doc_ids1 = document_folder1.documents.pluck(:id)
      doc_ids2 = document_folder2.documents.pluck(:id)
      expect(doc_ids1).to include(document.id)
      expect(doc_ids2).to_not include(document.id)
    end
  end
end
