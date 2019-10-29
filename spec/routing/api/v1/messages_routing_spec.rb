require "rails_helper"

RSpec.describe Api::V1::MessagesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/v1/messages").to\
        route_to("api/v1/messages#create")
    end
    it "routes to #show" do
      expect(get: "/api/v1/messages/1").to\
        route_to("api/v1/messages#show", id: '1')
    end
    it "routes to #inbox" do
      expect(get: "/api/v1/messages/inbox").to\
        route_to("api/v1/messages#inbox")
    end
    it "routes to #sent" do
      expect(get: "/api/v1/messages/sent").to\
        route_to("api/v1/messages#sent")
    end
  end
end