require "rails_helper"

RSpec.describe Api::V1::ProjectAdministratorsController, type: :routing do
  describe "routing" do
    it "routes to #show" do
      expect(get: "/api/v1/projects/1/admins/1").to\
        route_to("api/v1/project_administrators#show",
                 project_id: "1",
                 id: "1")
    end
    it "routes to #index" do
      expect(get: "/api/v1/projects/1/admins").to\
        route_to("api/v1/project_administrators#index",
                 project_id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/projects/1/admins/1").to\
        route_to("api/v1/project_administrators#destroy",
                 project_id: "1",
                 id: "1")
    end
    it "routes to #resend_confirmation" do
      expect(get: "/api/v1/projects/1/admins/1/resend_confirmation").to\
        route_to("api/v1/project_administrators#resend_confirmation",
                 project_id: "1",
                 id: "1")
    end
  end
end
