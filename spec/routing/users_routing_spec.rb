require 'rails_helper'

describe ContactsController, type: :routing do
  it{ expect(post("/users")).to\
      route_to("users#create") }
  it{ expect(put("/users/1")).to\
      route_to("users#update", id: "1") }
  it{ expect(delete("/users/1")).to\
      route_to("users#destroy", id: "1") }
end