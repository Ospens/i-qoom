require 'rails_helper'

describe "Project", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project, user_id: user.id) }
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
                    { admins_attributes:
                      { id: "",
                        email: Faker::Internet.email
                      }
                    }
                  }.to_json,
          headers: headers
        expect(response).to have_http_status(:success)
        expect(ActionMailer::Base.deliveries.count).to eq(0)
        expect(json["status"]).to eq("success")
      end
      it 'should get a status "error"' do
        post "/api/v1/projects",
          params: { project: { name: "12" } }.to_json,
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json["status"]).to eq("error")
      end
    end
    context "update" do
      context "creation_step 'admins'" do
        it 'should get a status "success" and add new admin to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { admins_attributes:
                        { id: "",
                          email: "someemail@gmail.com" } } }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).admins.count).to eq(2)
          expect(Project.find_by(id: project.id).admins.last.email).to\
            eq("someemail@gmail.com")
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "error" and don\'t
            add an admin' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { admins_attributes:
                        { id: "",
                          email: "notemail" } } }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).admins.count).not_to eq(2)
          expect(Project.find_by(id: project.id).admins.last.email).not_to\
            eq("notemail")
          expect(json["status"]).to eq("error")
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
          expect(json["status"]).to eq("success")
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
          expect(json["status"]).to eq("error")
        end
      end
      context "creation_step 'company_datum'" do
        it 'should get a status "success" and add a company datum to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_datum_step,
                company_datum_attributes: FactoryBot.attributes_for(:project_company_datum,
                  company_address_attributes: FactoryBot.attributes_for(:address)))
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_datum).to be_present
          expect(Project.find_by(id: project.id).company_datum.billing_address).not_to be_present
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "success" and add billing address to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_datum_step,
                company_datum_attributes: FactoryBot.attributes_for(:project_company_datum,
                  same_for_billing_address: "1",
                  company_address_attributes: FactoryBot.attributes_for(:address)))
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_datum.billing_address).to be_present
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "error" and don\'t
            add a company datum to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_datum_step)
            }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).company_datum).not_to be_present
          expect(json["status"]).to eq("error")
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
                company_datum_attributes: {
                  billing_address_attributes: FactoryBot.attributes_for(:address)
                }
              }
            }.to_json,
            headers: headers

          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project_without_billing_address.id)
                                .company_datum.billing_address).to be_present
          expect(Project.find_by(id: project_without_billing_address.id)
                                .creation_step).to eq("done")
          expect(ActionMailer::Base.deliveries.count).to eq(1)
          expect(json["status"]).to eq("success")
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
                company_datum_attributes: {
                  billing_address_attributes: { street: "unknown" }
                }
              }
            }.to_json,
            headers: headers

          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project_without_billing_address.id)
                                       .company_datum
                                       .billing_address).not_to be_present
          expect(Project.find_by(id: project_without_billing_address.id)
                                .creation_step).not_to eq("done")
          expect(json["status"]).to eq("error")
        end
      end
    end

    context "destroy" do
      it "should be destroyed" do
        third_project = FactoryBot.create(:project, user_id: user.id)
        delete "/api/v1/projects/#{third_project.id}",
              headers: headers
        expect(response).to have_http_status(:success)
        expect(Project.find_by(id: third_project.id)).to be_falsy
      end
    end

    context "confirm_admin" do
      it "should confirm an admin" do
        project_admin =
          FactoryBot.create(:project_done_step,
                            user_id: user.id).admins.first
        project_admin.update(email: user.email)
        get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:created)
        expect(ProjectAdministrator.find_by(id: project_admin.id).user).to eq(user)
      end
      it "shouldn't confirm an admin with wrong user" do
        project_admin =
          FactoryBot.create(:project_done_step,
                            user_id: user.id).admins.first
        get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(ProjectAdministrator.find_by(id: project_admin.id).user).to eq(nil)
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

    it 'confirm_account' do
      project_admin = FactoryBot.create(:project_done_step).admins.first
      get "/api/v1/projects/confirm_admin?token=#{project_admin.confirmation_token}",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end
