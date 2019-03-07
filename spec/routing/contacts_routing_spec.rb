require 'rails_helper'

describe ContactsController, type: :routing do
  it{ expect(post("/contacts")).to route_to("contacts#create") }
end