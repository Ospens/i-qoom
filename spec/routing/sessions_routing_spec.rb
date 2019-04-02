require 'rails_helper'

describe Api::V1::ContactsController, type: :routing do
  it{ expect(post("/api/v1/sessions")).to\
      route_to("api/v1/sessions#create") }
end
