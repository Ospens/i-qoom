require "rails_helper"

RSpec.describe Api::V1::DisciplinesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/projects/1/disciplines").to\
        route_to("api/v1/disciplines#index",
                 project_id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/projects/1/disciplines").to\
        route_to("api/v1/disciplines#create",
                 project_id: "1")
    end

    it "routes to #edit" do
      expect(get: "/api/v1/projects/1/disciplines/1/edit").to\
        route_to("api/v1/disciplines#edit",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #update" do
      expect(patch: "/api/v1/projects/1/disciplines/1").to\
        route_to("api/v1/disciplines#update",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #update" do
      expect(put: "/api/v1/projects/1/disciplines/1").to\
        route_to("api/v1/disciplines#update",
                 project_id: "1",
                 id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/projects/1/disciplines/1").to\
        route_to("api/v1/disciplines#destroy",
                 project_id: "1",
                 id: "1")
    end
  end
end