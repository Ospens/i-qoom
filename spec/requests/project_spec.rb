require 'rails_helper'

describe "Project", type: :request do
  let(:headers) { { "CONTENT_TYPE" => "application/json" } }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project, user_id: user.id) }
  let(:second_project) { FactoryBot.create(:project, user_id: user.id) }

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
    context  "create" do
      it 'should get a status "success"' do
        post "/api/v1/projects",
          params: { project: { name: "some name" } }.to_json,
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
    context "update" do
      it 'should get a status "success" and change the name of the project' do
        patch "/api/v1/projects/#{project.id}",
              params: { project: { name: "some name" } }.to_json,
              headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(Project.find_by(id: project.id).name).to eq("some name")
        expect(JSON(response.body)["status"]).to eq("success")
      end
      it 'should get a status "error" and don\'t
          change the name of the project' do
        patch "/api/v1/projects/#{second_project.id}",
              params: { project: { name: "12" } }.to_json,
              headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(Project.find_by(id: second_project.id).name).not_to eq("12")
        expect(JSON(response.body)["status"]).to eq("error")
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

  context '"not logged in and should get a status "forbidden"' do
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
