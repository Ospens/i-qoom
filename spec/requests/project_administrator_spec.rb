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
    context "destroy" do
      it "should work" do
        project.admins << FactoryBot.build(:project_administrator)
        project.save
        delete "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
               headers: headers.merge("Authorization" => auth_token)

        expect(response).to have_http_status(:created)
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
    it 'destroy' do
      delete "/api/v1/projects/#{project.id}/project_administrators/#{project.admins.first.id}",
             headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end