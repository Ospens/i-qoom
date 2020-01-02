require 'rails_helper'

describe DmsPlannedList, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }
  let(:user) { FactoryBot.create(:user) }

  context '#create' do
    let(:title) { Faker::Lorem.sentence }

    it 'anon' do
      post "/api/v1/projects/#{project.id}/dms_planned_lists",
        params: { dms_planned_list: { name: title } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{project.id}/dms_planned_lists",\
        params: { dms_planned_list: { name: title } },
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{project.id}/dms_planned_lists",\
        params: { dms_planned_list: { name: title } },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{project.id}/dms_planned_lists",\
        params: { dms_planned_list: { name: title } },
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(DmsPlannedList.count).to eql(1)
      expect(DmsPlannedList.last.name).to eql(title)
    end
  end

  context '#show' do
    let(:list) { FactoryBot.create(:dms_planned_list) }
    let(:document) do
      attrs = document_attributes(user)
      Document.create(attrs)
    end
    let(:project) { document.project }

    before do
      list.update(project: project)
      list.document_mains << document.document_main
    end

    it 'anon' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}",
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'list user' do
      list.users << user
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['name']).to eql(list.name)
      expect(json['documents'].length).to eql(1)
    end
  end

  context '#index' do
    let(:list) { FactoryBot.create(:dms_planned_list) }
    let(:project) { list.project }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists",
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    context 'dms user' do
      before do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)

      end

      it 'no lists' do
        get "/api/v1/projects/#{project.id}/dms_planned_lists",
          headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(0)
      end

      it 'with lists' do
        list.users << user
        get "/api/v1/projects/#{project.id}/dms_planned_lists",
          headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(1)
        expect(json.first['id']).to eql(list.id)
        expect(json.first['name']).to eql(list.name)
      end
    end

    it 'dms master should see all project lists' do
      project.members.create!(user: user,
                              dms_module_access: true,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/dms_planned_lists",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json.length).to eql(1)
    end
  end

  context '#update' do
    let(:title) { Faker::Lorem.sentence }
    let(:list) { FactoryBot.create(:dms_planned_list) }

    it 'anon' do
      put "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}",
        params: { dms_planned_list: { name: title } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      put "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}",
        params: { dms_planned_list: { name: title } },
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      list.project.members.create!(user: user,
                                   dms_module_access: true,
                                   employment_type: :employee)
      put "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}",
        params: { dms_planned_list: { name: title } },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'wrong project' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      put "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}",
        params: { dms_planned_list: { name: title } },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      list.project.members.create!(user: user,
                                   dms_module_master: true,
                                   employment_type: :employee)
      put "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}",
        params: { dms_planned_list: { name: title } },
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(list.reload.name).to eql(title)
    end
  end

  context '#update_users' do
    let(:title) { Faker::Lorem.sentence }
    let(:list) { FactoryBot.create(:dms_planned_list) }
    let(:user2) { FactoryBot.create(:user) }

    it 'anon' do
      post "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}/update_users",
        params: { users: [user2.id] }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}/update_users",
        params: { users: [user2.id] },
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms user' do
      list.project.members.create!(user: user,
                                   dms_module_access: true,
                                   employment_type: :employee)
      post "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}/update_users",
        params: { users: [user2.id] },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'wrong project' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      post "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}/update_users",
        params: { users: [user2.id] },
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      list.project.members.create!(user: user,
                                   dms_module_master: true,
                                   employment_type: :employee)
      post "/api/v1/projects/#{list.project.id}/dms_planned_lists/#{list.id}/update_users",
        params: { users: [user2.id] },
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(list.users.count).to eql(1)
    end
  end

  context '#edit_documents' do
    let(:title) { Faker::Lorem.sentence }
    let(:list) { FactoryBot.create(:dms_planned_list) }
    let(:document) do
      attrs = document_attributes(user)
      Document.create(attrs)
    end
    let(:project) { document.project }

    before do
      document.document_main.update(position: 3)
      list.update(project: project)
      list.document_mains << document.document_main
    end

    it 'anon' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}/edit_documents"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}/edit_documents",\
        headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}/edit_documents",\
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'dms master' do
      project.members.create!(user: user,
                              dms_module_master: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/dms_planned_lists/#{list.id}/edit_documents",\
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['document_mains'].length).to eql(1)
      expect(json['new']['document_fields'].length).to eql(8)
      main = json['document_mains'].first
      expect(main['document']['document_fields'].length).to eql(8)
      expect(main['position']).to eql(3)
    end
  end

  context '#update_documents' do
    let(:title) { Faker::Lorem.sentence }
    let(:list) { FactoryBot.create(:dms_planned_list) }

    before do
      @params = document_attributes(user, false)
      project = get_project_from_document_attrs(@params)
      @params = { document_mains: [{ id: '', position: 2, document: @params }] }
      @project_id = project.id
      list.update(project: project)
    end

    it 'anon' do
      post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents", params: @params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
        params: @params, headers: credentials(FactoryBot.create(:user))
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
        params: @params, headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    context 'dms master' do
      context 'create document' do
        before do
          Project.find(@project_id).members.create!(user: user,
                                                    dms_module_master: true,
                                                    employment_type: :employee)
        end

        it 'valid document' do
          post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
            params: @params, headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(DocumentMain.last).to be_planned
          expect(DocumentMain.last.position).to eql(2)
          main = json['document_mains'].first
          expect(main).to have_key('document')
        end

        it 'invalid document' do
          DocumentMain.destroy_all
          expect(DocumentMain.count).to eql(0)
          @params[:document_mains].first[:document]['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values'] = nil
          @params[:document_mains].first[:temp_id] = '1'
          post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
            params: @params, headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(Document.count).to eql(0)
          expect(DocumentRevision.count).to eql(0)
          expect(DocumentMain.count).to eql(0)
          main = json['document_mains'].first
          expect(main).to have_key('temp_id')
          expect(main).to have_key('errors')
        end

        it 'native file is not required' do
          DocumentMain.destroy_all
          expect(DocumentMain.count).to eql(0)
          @params[:document_mains].first[:document]['document_fields'].detect{ |i| i['codification_kind'] == 'document_native_file' }['file'] = nil
          @params[:document_mains].first[:temp_id] = '1'
          post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
            params: @params, headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(DocumentMain.count).to eql(1)
        end

        it 'review_status is not required' do
          DocumentMain.destroy_all
          expect(DocumentMain.count).to eql(0)
          @params[:document_mains].first[:document]['review_status'] = nil
          post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
            params: @params, headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(DocumentMain.count).to eql(1)
        end
      end

      context 'update document' do
        let(:doc) { FactoryBot.create(:document) }
        let(:doc_attrs) do
          attrs = doc.attributes_for_edit
          attrs['id'] = doc.id
          attrs['email_title'] = title
          doc.project.members.create!(user: user,
                                      dms_module_master: true,
                                      employment_type: :employee)
          list.update(project: doc.project)
          doc.document_main.update!(planned: true)
          attrs
        end

        it 'not in list' do
          post "/api/v1/projects/#{doc.project.id}/dms_planned_lists/#{list.id}/update_documents",
            params: { document_mains: [ { id: doc.document_main.id,
                                          document: doc_attrs } ] },
            headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(doc.revision.last_version.email_title).to_not eql(title)
        end

        context 'in list' do
          before do
            list.document_mains << doc.document_main
          end

          it 'valid' do
            post "/api/v1/projects/#{doc.project.id}/dms_planned_lists/#{list.id}/update_documents",
              params: { document_mains: [ { id: doc.document_main.id,
                                            document: doc_attrs } ] },
              headers: credentials(user)
            expect(response).to have_http_status(:success)
            expect(doc.revision.versions.count).to eql(2)
            expect(doc.revision.last_version.email_title).to eql(title)
          end

          it 'valid' do
            field = doc.document_fields.find_by(kind: :upload_field)
            field.file.purge
            post "/api/v1/projects/#{doc.project.id}/dms_planned_lists/#{list.id}/update_documents",
              params: { document_mains: [ { id: doc.document_main.id,
                                            document: doc_attrs } ] },
              headers: credentials(user)
            expect(response).to have_http_status(:success)
          end

          it 'invalid' do
            attrs = doc_attrs
            attrs['document_fields'].detect{ |i| i['codification_kind'] == 'originating_company' }['document_field_values'] = []
            post "/api/v1/projects/#{doc.project.id}/dms_planned_lists/#{list.id}/update_documents",
              params: { document_mains: [ { id: doc.document_main.id,
                                            temp_id: '1',
                                            document: attrs } ] },
              headers: credentials(user)
            expect(response).to have_http_status(:success)
            expect(doc.revision.last_version.email_title).to_not eql(title)
            main = json['document_mains'].first
            expect(main).to have_key('temp_id')
            expect(main).to have_key('errors')
          end
        end
      end
    end
  end
end
