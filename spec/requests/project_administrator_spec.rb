require 'rails_helper'

describe "ProjectAdministrator", type: :request do
  let(:project) { FactoryBot.create(:project_with_admins) }
  let(:user) { project.user }
  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    context "show" do
      it "should render an admin" do
        get "/api/v1/projects/#{project.id}/admins/#{project.admins.first.id}",
               headers: headers
        expect(response).to have_http_status(:success)
        expect(json["email"]).to eq(project.admins.first.email)
      end
    end
    context "index" do
      it "should render admins" do
        get "/api/v1/projects/#{project.id}/admins",
               headers: headers
        expect(response).to have_http_status(:success)
        expect(json.map { |h| h["id"] }).to\
          eq(project.admins.map(&:id))
      end
      it "shouldn't render admins if there is no access to the project" do
        second_user = FactoryBot.create(:user)
        second_project = FactoryBot.create(:project, user_id: second_user.id)
        get "/api/v1/projects/#{second_project.id}/admins",
               headers: headers
        expect(response).to have_http_status(:forbidden)
      end
    end
    context "resend_confirmation" do
      it "should work" do
        project.admins << FactoryBot.build(:project_administrator,
                                           status: "unconfirmed")
        project.save
        get "/api/v1/projects/#{project.id}/admins/#{project.admins.last.id}/resend_confirmation",
               headers: headers
        expect(response).to have_http_status(:success)
        expect(ActionMailer::Base.deliveries.last.to).to include(project.admins.last.email)
      end
    end
    context "destroy" do
      it "should work" do
        project.admins << FactoryBot.build(:project_administrator)
        project.save
        delete "/api/v1/projects/#{project.id}/admins/#{project.admins.last.id}",
               headers: headers

        expect(response).to have_http_status(:success)
        expect(project.admins.count).to eq(2)
      end
      it "shouldn't work" do
        project.admins.first.remove
        delete "/api/v1/projects/#{project.id}/admins/#{project.admins.first.id}",
               headers: headers

        expect(response).to have_http_status(:forbidden)
        expect(project.admins.count).to eq(1)
      end
    end
  end

  context 'not logged in and should get a status "forbidden" on' do
    let(:headers) { { "CONTENT_TYPE" => "application/json" } }
    it 'show' do
      get "/api/v1/projects/#{project.id}/admins/#{project.admins.first.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'index' do
      get "/api/v1/projects/#{project.id}/admins",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'resend_confirmation' do
      get "/api/v1/projects/#{project.id}/admins/#{project.admins.last.id}/resend_confirmation",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end

    it 'destroy' do
      delete "/api/v1/projects/#{project.id}/admins/#{project.admins.last.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end