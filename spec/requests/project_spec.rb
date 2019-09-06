require 'rails_helper'

describe "Project", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project_admins_step, user_id: user.id) }
  let(:second_project) { FactoryBot.create(:project, user_id: user.id) }
  let(:second_user) { FactoryBot.create(:user) }
  let(:different_project) { FactoryBot.create(:project,
                                              user_id: second_user.id) }
  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    context "index" do
      it 'should get a status "success" and render projects' do
        get "/api/v1/projects",
             headers: headers
        expect(response).to have_http_status(:success)
        expect(json
                .map { |h| h["id"] }).to include(*user.projects.map(&:id))
      end
    end
    context "show" do
      it 'should get a status "success" and render the project' do
        get "/api/v1/projects/#{project.id}",
             headers: headers
        expect(response).to have_http_status(:success)
        expect(json.values).to include(project.name)
      end
    end
    context  "create (creation_step 'admins')" do
      it 'should get a status "success"' do
        post "/api/v1/projects",
          params: { project:
                    { admins:
                      { id: "",
                        email: Faker::Internet.email
                      }
                    }
                  }.to_json,
          headers: headers
        expect(response).to have_http_status(:success)
        expect(ActionMailer::Base.deliveries.count).to eq(1)
      end
      it 'should get a status "error"' do
        post "/api/v1/projects",
          params: { project: { name: "12" } }.to_json,
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
    context "update" do
      context "creation_step 'admins'" do
        it 'should get a status "success" and add new admin to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { admins:
                        { id: "",
                          email: "someemail@gmail.com" } } }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).admins.count).to eq(3)
          expect(Project.find_by(id: project.id).admins.last.email).to\
            eq("someemail@gmail.com")
        end
        it 'should get a status "error" and don\'t
            add an admin' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { admins:
                        { id: "",
                          email: "notemail" } } }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).admins.count).not_to eq(3)
          expect(Project.find_by(id: project.id).admins.last.email).not_to\
            eq("notemail")
        end
      end

      context "creation_step 'name'" do
        it 'should get a status "success" and change the name of the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { name: "some name",
                        creation_step: "name" } }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).name).to eq("some name")
        end
        it 'should get a status "error" and don\'t
            change the name of the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { name: "12",
                        creation_step: "name" } }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).name).not_to eq("12")
        end
      end
      context "creation_step 'company_data'" do
        it 'should get a status "success" and add a company data to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_data_step)
                        .merge(company_data: FactoryBot.attributes_for(:project_company_data)
                        .merge(company_address: FactoryBot.attributes_for(:address)))
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_data).to be_present
          expect(Project.find_by(id: project.id).company_data.billing_address).not_to be_present
        end
        it 'should get a status "success" and add billing address to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_data_step)
                        .merge(company_data: FactoryBot.attributes_for(:project_company_data,
                                                                        same_for_billing_address: "1")
                        .merge(company_address: FactoryBot.attributes_for(:address)))
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_data.billing_address).to be_present
        end
        it 'should get a status "error" and don\'t
            add a company data to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_data_step)
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).company_data).not_to be_present
        end
      end
      context "creation_step 'billing_address'" do
        it 'should get a status "success" and add a billing_address to the project' do
          project_without_billing_address =
            FactoryBot.create(:project_pre_billing_address_step,
                               user_id: user.id)
          patch "/api/v1/projects/#{project_without_billing_address.id}",
            params: {
              project: {
                creation_step: "billing_address",
                company_data: {
                  billing_address: FactoryBot.attributes_for(:address)
                }
              }
            }.to_json,
            headers: headers

          updated_project =
            Project.find_by(id: project_without_billing_address.id)
          expect(response).to have_http_status(:success)
          expect(updated_project.company_data.billing_address).to be_present
          expect(updated_project.creation_step).to eq("done")
          expect(ActionMailer::Base.deliveries.count).to eq(2)
          expect(updated_project.admins.awaiting_confirmation.first.inviter_id).to eq(user.id)
        end
        it "should get a status 'error' and don't
            add a billing_address to the project" do
          project_without_billing_address =
            FactoryBot.create(:project_pre_billing_address_step,
                               user_id: user.id)
          patch "/api/v1/projects/#{project_without_billing_address.id}",
            params: {
              project: {
                creation_step: "billing_address",
                company_data: {
                  billing_address: { street: "unknown" }
                }
              }
            }.to_json,
            headers: headers

          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project_without_billing_address.id)
                                       .company_data
                                       .billing_address).not_to be_present
          expect(Project.find_by(id: project_without_billing_address.id)
                                .creation_step).not_to eq("done")
        end
      end
    end

    context "destroy" do
      it "should be destroyed" do
        third_project = FactoryBot.create(:project_admins_step, user_id: user.id)
        delete "/api/v1/projects/#{third_project.id}",
              headers: headers
        expect(response).to have_http_status(:success)
        expect(Project.find_by(id: third_project.id)).to be_falsy
      end
    end

    context "confirm_admin" do
      it "should confirm an admin" do
        project_admin =
          FactoryBot.create(:project,
                            user_id: user.id).admins.last
        project_admin.update(email: user.email)
        get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:created)
        expect(ProjectAdministrator.find_by(id: project_admin.id).user).to eq(user)
      end
      it "shouldn't confirm an admin with wrong user" do
        project_admin =
          FactoryBot.create(:project,
                            user_id: user.id).admins.last
        get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(ProjectAdministrator.find_by(id: project_admin.id).user).to eq(nil)
      end
    end

    context "confirm_member" do
      it "should confirm a member" do
        project_member =
          FactoryBot.create(:project_member_pending)
        project_member.update(email: user.email)
        get "/api/v1/projects/confirm_member?token=#{project_member.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:created)
        expect(ProjectMember.find_by(id: project_member.id).user).to eq(user)
      end
      it "shouldn't confirm a member with wrong user" do
        project_member =
          FactoryBot.create(:project_member_pending)
        get "/api/v1/projects/confirm_member?token=#{project_member.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(ProjectMember.find_by(id: project_member.id).user).to eq(nil)
      end
    end

    context "invite" do
      it "should invite members" do
        member_ids =
          FactoryBot.create_list(:project_member_pending,
                                 2,
                                 project: project).map(&:id)
        post "/api/v1/projects/#{project.id}/invite",
             params: { project_member_ids: member_ids }.to_json,
             headers: headers
        expect(response).to have_http_status(:ok)
        expect(ActionMailer::Base.deliveries.count).to eq(3)
        expect(ProjectMember.where(id: member_ids).first.inviter_id).to eq(user.id)
      end
      it "shouldn't invite members" do
        post "/api/v1/projects/#{project.id}/invite",
             params: { project_member_ids: [] }.to_json,
             headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(ActionMailer::Base.deliveries.count).to eq(1)
      end
    end

    context "update_project_code" do
      it "valid" do
        post "/api/v1/projects/#{project.id}/update_project_code",
             params: { project_code: 'AAA' }.to_json,
             headers: headers
        expect(response).to have_http_status(:ok)
        expect(project.reload.project_code).to eql('AAA')
      end

      it "invalid" do
        post "/api/v1/projects/#{project.id}/update_project_code",
             params: { project_code: 'aaa' }.to_json,
             headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  context 'not logged in and should get a status "forbidden" on' do
    let(:headers) { { "CONTENT_TYPE" => "application/json" } }
    it 'index' do
      get "/api/v1/projects",
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'show' do
      get "/api/v1/projects/#{project.id}",
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'create' do
      post "/api/v1/projects",
           params: { project: { name: "some name" } }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'update' do
      patch "/api/v1/projects/#{project.id}",
           params: { project: { name: "some name" } }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'destroy' do
      delete "/api/v1/projects/#{project.id}",
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'confirm_admin' do
      project_admin = FactoryBot.create(:project).admins.last
      get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'confirm_member' do
      project_member = FactoryBot.create(:project_member)
      get "/api/v1/projects/confirm_admin?token=#{project_member.confirmation_token}",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'invite' do
      member_ids =
        FactoryBot.create_list(:project_member_pending,
                               2,
                               project: project).map(&:id)
      post "/api/v1/projects/#{project.id}/invite",
           params: { project_member_ids: member_ids }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
      expect(ActionMailer::Base.deliveries.count).to eq(1)
    end

    it 'update_project_code' do
        post "/api/v1/projects/#{project.id}/update_project_code",
             params: { project_code: 'AAA' }.to_json,
             headers: headers
      expect(response).to have_http_status(:forbidden)
      expect(project.reload.project_code).to be_nil
    end
  end
end
