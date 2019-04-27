require 'rails_helper'

describe "Project", type: :request do
  headers = { "CONTENT_TYPE" => "application/json" }
  user = FactoryBot.create(:user)
  project = FactoryBot.create(:project, user_id: user.id)
  second_project = FactoryBot.create(:project, user_id: user.id)
  context "logged in" do
    let(:auth_token) do
      post "/api/v1/sessions",
           params: { session: { login: user.email,
                                password: "password1" } }.to_json,
           headers: headers
      JSON(response.body)["auth_token"]
    end
    context "index" do
      it 'should get a status "success" and render projects' do
        get "/api/v1/projects",
             headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(JSON(response.body)["location"]
                .map { |h| h["id"] }).to include(*user.projects.map(&:id))
      end
    end
    context "show" do
      it 'should get a status "success" and render the project' do
        get "/api/v1/projects/#{project.id}",
             headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(JSON(response.body)["location"].values).to include(project.name)
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
          headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(JSON(response.body)["status"]).to eq("success")
      end
      it 'should get a status "error"' do
        post "/api/v1/projects",
          params: { project: { name: "12" } }.to_json,
          headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON(response.body)["status"]).to eq("error")
      end
    end
    context "update (creation_step 'admins')" do
      it 'should get a status "success" and add a new admin to the project' do
        patch "/api/v1/projects/#{project.id}",
          params: { project:
                    { admins_attributes:
                      { id: "",
                        email: "someemail@gmail.com"
                      }
                    }
                  }.to_json,
          headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(Project.find_by(id: project.id).admins.count).to eq(2)
        expect(Project.find_by(id: project.id).admins.last.email).to\
          eq("someemail@gmail.com")
        expect(JSON(response.body)["status"]).to eq("success")
      end
      it 'should get a status "error" and don\'t
          add an admin' do
        patch "/api/v1/projects/#{project.id}",
          params: { project:
                    { admins_attributes:
                      { id: "",
                        email: "ail.com"
                      }
                    }
                  }.to_json,
          headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(Project.find_by(id: second_project.id).name).not_to eq("12")
        expect(JSON(response.body)["status"]).to eq("error")
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
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).admins.count).to eq(2)
          expect(Project.find_by(id: project.id).admins.last.email).to\
            eq("someemail@gmail.com")
          expect(JSON(response.body)["status"]).to eq("success")
        end
        it 'should get a status "error" and don\'t
            add an admin' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { admins_attributes:
                        { id: "",
                          email: "notemail" } } }.to_json,
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).admins.count).not_to eq(2)
          expect(Project.find_by(id: project.id).admins.last.email).not_to\
            eq("notemail")
          expect(JSON(response.body)["status"]).to eq("error")
        end
      end

      context "creation_step 'name'" do
        it 'should get a status "success" and change the name of the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { name: "some name",
                        creation_step: "name" } }.to_json,
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).name).to eq("some name")
          expect(JSON(response.body)["status"]).to eq("success")
        end
        it 'should get a status "error" and don\'t
            change the name of the project' do
          patch "/api/v1/projects/#{project.id}",
            params: { project:
                      { name: "12",
                        creation_step: "name" } }.to_json,
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).name).not_to eq("12")
          expect(JSON(response.body)["status"]).to eq("error")
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
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_datum).to be_present
          expect(Project.find_by(id: project.id).company_datum.billing_address).not_to be_present
          expect(JSON(response.body)["status"]).to eq("success")
        end
        it 'should get a status "success" and add billing address to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_datum_step,
                company_datum_attributes: FactoryBot.attributes_for(:project_company_datum,
                  same_for_billing_address: "1",
                  company_address_attributes: FactoryBot.attributes_for(:address)))
            }.to_json,
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project.id).company_datum.billing_address).to be_present
          expect(JSON(response.body)["status"]).to eq("success")
        end
        it 'should get a status "error" and don\'t
            add a company datum to the project' do
          patch "/api/v1/projects/#{project.id}",
            params: {
              project: FactoryBot.attributes_for(:project_company_datum_step)
            }.to_json,
            headers: headers.merge("Authorization" => auth_token)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project.id).company_datum).not_to be_present
          expect(JSON(response.body)["status"]).to eq("error")
        end
      end
      context "creation_step 'billing_address'" do
        it 'should get a status "success" and add a billing_address to the project' do
          project_without_billing_address =
            FactoryBot.create(:project_done_step,
                              creation_step: "company_datum",
                              user_id: user.id)
          project_without_billing_address.company_datum
                                         .billing_address
                                         .destroy
          patch "/api/v1/projects/#{project_without_billing_address.id}",
            params: {
              project: {
                creation_step: "billing_address",
                company_datum_attributes: {
                  billing_address_attributes: FactoryBot.attributes_for(:address)
                }
              }
            }.to_json,
            headers: headers.merge("Authorization" => auth_token)

          expect(response).to have_http_status(:success)
          expect(Project.find_by(id: project_without_billing_address.id)
                                .company_datum.billing_address).to be_present
          expect(Project.find_by(id: project_without_billing_address.id)
                                .creation_step).to eq("done")
          expect(JSON(response.body)["status"]).to eq("success")
        end
        it "should get a status 'error' and don't
            add a billing_address to the project" do
          project_without_billing_address =
            FactoryBot.create(:project_done_step,
                              creation_step: "company_datum",
                              user_id: user.id)
          project_without_billing_address.company_datum
                                         .billing_address
                                         .destroy
          patch "/api/v1/projects/#{project_without_billing_address.id}",
            params: {
              project: {
                creation_step: "billing_address",
                company_datum_attributes: {
                  billing_address_attributes: { street: "unknown" }
                }
              }
            }.to_json,
            headers: headers.merge("Authorization" => auth_token)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(Project.find_by(id: project_without_billing_address.id)
                                       .company_datum
                                       .billing_address).not_to be_present
          expect(JSON(response.body)["status"]).to eq("error")
        end
      end
    end

    context "destroy" do
      it "should be destroyed" do
        third_project = FactoryBot.create(:project, user_id: user.id)
        delete "/api/v1/projects/#{third_project.id}",
              headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(Project.find_by(id: third_project.id)).to be_falsy
      end
    end

  end

  context 'not logged in and should get a status "forbidden"' do
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
  end
end
