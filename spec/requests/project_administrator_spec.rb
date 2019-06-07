require 'rails_helper'

describe "ProjectAdministrator", type: :request do
  let(:headers) { { "CONTENT_TYPE" => "application/json" } }
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project, user_id: user.id) }

  context "logged in" do
    let(:auth_token) do
      post "/api/v1/sessions",
           params: { session: { login: user.email,
                                password: "password1" } }.to_json,
           headers: headers
      JSON(response.body)["auth_token"]
    end
    context "show" do
      it "should render an admin" do
        get "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
               headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(JSON(response.body)["email"]).to eq(project.admins.first.email)
      end
    end
    context "index" do
      it "should render admins" do
        get "/api/v1/projects/#{project.id}/project_administrators",
               headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(JSON(response.body).map { |h| h["id"] }).to\
          eq(project.admins.map(&:id))
      end
      it "shouldn't render admins if there is no access to the project" do
        second_user = FactoryBot.create(:user)
        second_project = FactoryBot.create(:project, user_id: second_user.id)
        get "/api/v1/projects/#{second_project.id}/project_administrators",
               headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:forbidden)
      end
    end
    context "resend_confirmation" do
      it "should work" do
        get "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}/resend_confirmation",
               headers: headers.merge("Authorization" => auth_token)
        expect(response).to have_http_status(:success)
        expect(ActionMailer::Base.deliveries.count).to eq(1)
      end
    end
    context "destroy" do
      it "should work" do
        project.admins << FactoryBot.build(:project_administrator)
        project.save
        delete "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
               headers: headers.merge("Authorization" => auth_token)

        expect(response).to have_http_status(:success)
        expect(project.admins.count).to eq(1)
      end
      it "shouldn't work" do
        delete "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
               headers: headers.merge("Authorization" => auth_token)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(project.admins.count).to eq(1)
      end
    end
  end


  context 'not logged in and should get a status "forbidden" on' do
    it 'show' do
      get "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'index' do
      get "/api/v1/projects/#{project.id}/project_administrators",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'resend_confirmation' do
      get "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}/resend_confirmation",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'destroy' do
      delete "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end