require "rails_helper"

RSpec.describe Api::V1::ProjectMembersController, type: :routing do
  describe "routing" do
    it "routes to #active" do
      expect(get: "/api/v1/projects/1/members/active").to\
        route_to("api/v1/project_members#active",
                 project_id: "1")
    end

    it "routes to #pending" do
      expect(get: "/api/v1/projects/1/members/pending").to\
        route_to("api/v1/project_members#pending",
                 project_id: "1")
    end

    it "routes to #new" do
      expect(get: "/api/v1/projects/1/members/new").to\
        route_to("api/v1/project_members#new",
                 project_id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/projects/1/members").to\
        route_to("api/v1/project_members#create",
                 project_id: "1")
    end

    it "routes to #edit" do
      expect(get: "/api/v1/projects/1/members/1/edit").to\
        route_to("api/v1/project_members#edit",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #update" do
      expect(patch: "/api/v1/projects/1/members/1").to\
        route_to("api/v1/project_members#update",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #update" do
      expect(put: "/api/v1/projects/1/members/1").to\
        route_to("api/v1/project_members#update",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #check_if_present" do
      expect(get: "/api/v1/projects/1/members/check_if_present").to\
        route_to("api/v1/project_members#check_if_present",
                 project_id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/projects/1/members/1").to\
        route_to("api/v1/project_members#destroy",
                 project_id: "1",
                 id: "1")
    end
  end
end
