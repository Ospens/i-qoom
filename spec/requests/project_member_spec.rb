require 'rails_helper'

describe "ProjectMember", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:project) { FactoryBot.create(:project,
                                    user_id: user.id) }
  let(:project_member_employment_type) { FactoryBot.create(:project_member_employment_type,
                                                           project_id: project.id) }
  let(:project_member) { FactoryBot.create(:project_member,
                                           project_id: project.id) }
  let(:json) { JSON(response.body) }

  context "logged in" do
    let(:headers) { credentials(user).merge("CONTENT_TYPE" => "application/json") }
    context "index" do
      it 'should get a status "success" and render project_members' do
        get "/api/v1/projects/#{project.id}/members",
             headers: headers
        expect(response).to have_http_status(:success)
        expect(json
                .map { |h| h["id"] }).to include(*project.members.map(&:id))
      end
    end
    # context "show" do
    #   it 'should get a status "success" and render the project member' do
    #     get "/api/v1/projects/#{project.id}/members/#{project_member.id}",
    #          headers: headers
    #     expect(response).to have_http_status(:success)
    #     expect(json.values).to include(project_member.first_name)
    #   end
    # end
    context "new" do
      it "should get a status 'success' and render the company_types
          and employment_types data" do
        get "/api/v1/projects/#{project.id}/members/new",
            headers: headers
        expect(response).to have_http_status(:success)
        expect(json.values.first.first.values).to\
          include("Project Company")
        expect(json.values.second.first.values).to\
          include("Employee")
      end
    end
    context  "create (creation_step 'employment_type')" do
      it 'should get a status "success"' do
        post "/api/v1/projects/#{project.id}/members",
          params: { project_member:
                    { creation_step: "employment_type",
                      employment_type: ProjectMember.employment_types.keys.sample }
                  }.to_json,
          headers: headers
        expect(response).to have_http_status(:success)
        expect(json["status"]).to eq("success")
      end
      it 'should get a status "error"' do
        post "/api/v1/projects/#{project.id}/members",
          params: { project_member:
                      { creation_step: "employment_type" }
                    }.to_json,
          headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json["status"]).to eq("error")
      end
    end
    context "update" do
      context "creation_step 'employment_type'" do
        it 'should get a status "success"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_employment_type.id}",
            params: { project_member:
                      { creation_step: "employment_type",
                        employment_type: ProjectMember.employment_types.keys.sample }
                    }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "error"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_employment_type.id}",
            params: { project_member:
                        { creation_step: "employment_type",
                          employment_type: "" }
                      }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json["status"]).to eq("error")
        end
      end
      context "creation_step 'company_type'" do
        it 'should get a status "success"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_employment_type.id}",
            params: { project_member:
                      { creation_step: "company_type",
                        company_type: ProjectMember.company_types.keys.sample }
                    }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "error"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_employment_type.id}",
            params: { project_member:
                        { creation_step: "company_type",
                          company_type: "" }
                      }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json["status"]).to eq("error")
        end
      end
      context "creation_step 'company_data'" do
        let(:project_member_company_type) {
          FactoryBot.create(:project_member_company_type,
                            project_id: project.id)
        }
        it 'should get a status "success"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_company_type.id}",
            params: { project_member:
                      { creation_step: "company_data",
                        company_address: FactoryBot.attributes_for(:address) }
                    }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(json["status"]).to eq("success")
        end
        it 'should get a status "error"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_company_type.id}",
            params: { project_member:
                        { creation_step: "company_data" }
                      }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json["status"]).to eq("error")
        end
      end
      context "creation_step 'details'" do
        let(:project_member_company_data) {
          FactoryBot.create(:project_member_company_data,
                            project_id: project.id)
        }
        it 'should get a status "success"' do
          discipline = 
            FactoryBot.create(:discipline, project_id: project.id)
          patch "/api/v1/projects/#{project.id}/members/#{project_member_company_data.id}",
            params: { project_member:
                      { creation_step: "details",
                        email: Faker::Internet.email,
                        first_name: Faker::Name.first_name,
                        last_name: Faker::Name.last_name,
                        discipline_id: discipline.id }
                    }.to_json,
            headers: headers
          expect(response).to have_http_status(:success)
          expect(json["status"]).to eq("success")
          expect(ProjectMember.find_by(id: project_member_company_data.id).creation_step).to eq("completed")
          expect(ProjectMember.find_by(id: project_member_company_data.id).discipline).to be_truthy
        end
        it 'should get a status "error"' do
          patch "/api/v1/projects/#{project.id}/members/#{project_member_company_data.id}",
            params: { project_member:
                        { creation_step: "details" }
                      }.to_json,
            headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json["status"]).to eq("error")
          expect(ProjectMember.find_by(id: project_member_company_data.id).creation_step).not_to eq("completed")
        end
      end
    end
  end
  context 'not logged in and should get a status "forbidden" on' do
    let(:headers) { { "CONTENT_TYPE" => "application/json" } }
    it 'index' do
      get "/api/v1/projects/#{project.id}/members",
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    # it 'show' do
    #   get "/api/v1/projects/#{project.id}/members/#{project_member.id}",
    #        headers: headers
    #   expect(response).to have_http_status(:forbidden)
    # end
    it 'new' do
      get "/api/v1/projects/#{project.id}/members/new",
          headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'create' do
      post "/api/v1/projects/#{project.id}/members/",
           params: {
             project_member: { creation_step: "some step" }
           }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
    it 'update' do
      patch "/api/v1/projects/#{project.id}/members/#{project_member.id}",
           params: {
             project_member: { creation_step: "some step" }
           }.to_json,
           headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end