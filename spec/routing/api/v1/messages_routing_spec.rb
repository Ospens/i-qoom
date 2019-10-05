require "rails_helper"

RSpec.describe Api::V1::MessagesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/v1/messages").to\
        route_to("api/v1/messages#create")
    end
  end
end