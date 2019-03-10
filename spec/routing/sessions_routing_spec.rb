require 'rails_helper'

describe Api::V1::ContactsController, type: :routing do
  it{ expect(post("/api/v1/sessions")).to\
      route_to("api/v1/sessions#create") }
  it{ expect(delete("/api/v1/sessions/1")).to\
      route_to("api/v1/sessions#destroy", id: "1") }
end
