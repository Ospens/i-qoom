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
      it 'create document' do
        Project.find(@project_id).members.create!(user: user,
                                                  dms_module_master: true,
                                                  employment_type: :employee)
        post "/api/v1/projects/#{@project_id}/dms_planned_lists/#{list.id}/update_documents",\
          params: @params, headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(DocumentMain.last).to be_planned
        expect(DocumentMain.last.position).to eql(2)
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

        it 'in list' do
          list.document_mains << doc.document_main
          post "/api/v1/projects/#{doc.project.id}/dms_planned_lists/#{list.id}/update_documents",
            params: { document_mains: [ { id: doc.document_main.id,
                                          document: doc_attrs } ] },
            headers: credentials(user)
          expect(response).to have_http_status(:success)
          expect(doc.revision.last_version.email_title).to eql(title)
        end
      end
    end
  end
end
