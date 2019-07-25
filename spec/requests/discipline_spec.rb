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
  end
end