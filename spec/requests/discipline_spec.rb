require 'rails_helper'

describe "Discipline", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project_with_disciplines,
                                    user_id: user.id) }
  let(:project_member) { FactoryBot.create(:project_member,
                                           project_id: project.id) }
  let(:discipline) { project.disciplines.first }
  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    context "index" do
      it 'should get a status "success" and render disciplines' do
        get "/api/v1/projects/#{project.id}/disciplines",
            headers: headers
        expect(response).to have_http_status(:success)
        expect(json.map { |h| h["name"] }).to\
          include(*project.disciplines.map(&:name))
      end
    end
    context "edit" do
      it 'should get a status "success" and render the discipline' do
        get "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}/edit",
            headers: headers
        expect(response).to have_http_status(:success)
        expect(json["name"]).to include(*discipline.name)
      end
    end
    context "create" do
      it 'should get a status "success" and create a discipline' do
        post "/api/v1/projects/#{project.id}/disciplines",
             params: { discipline: { name: "some field" } }.to_json,
             headers: headers
        expect(response).to have_http_status(:success)
        expect(project.disciplines.count).to eq(11)
      end
      it "should get a status 'error' and don't create a discipline" do
        post "/api/v1/projects/#{project.id}/disciplines",
             params: { discipline: { name: " " } }.to_json,
             headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(project.disciplines.count).to eq(10)
      end
    end
    context "update" do
      it 'should get a status "success" and update a discipline' do
        patch "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}",
             params: { discipline: { name: "new name" } }.to_json,
             headers: headers
        expect(response).to have_http_status(:success)
        expect(json["discipline"].first["name"]).to eq("new name")
      end
      it "should get a status 'error' and don't update the discipline" do
        patch "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}",
             params: { discipline: { name: " " } }.to_json,
             headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(discipline.name).not_to eq(" ")
      end
    end
    context "destroy" do
      it "should get a status 'success' and destroy the discipline" do
        delete "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}",
               headers: headers
        expect(response).to have_http_status(:success)
        expect(Discipline.find_by(id: discipline.id)).to be_falsy
      end
    end
  end
  context 'not logged in and should get a status "forbidden" on' do
    let(:headers) { { "CONTENT_TYPE" => "application/json" } }
    it 'index' do
      get "/api/v1/projects/#{project.id}/disciplines",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'edit' do
      get "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}/edit",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'create' do
      post "/api/v1/projects/#{project.id}/disciplines",
           params: { discipline: { name: "some field" } }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'update' do
      patch "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}",
            params: { discipline: { name: "some field" } }.to_json,
            headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'destroy' do
      delete "/api/v1/projects/#{project.id}/disciplines/#{discipline.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end