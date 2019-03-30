require 'rails_helper'

describe ContactsController, type: :routing do
  it{ expect(post("/sessions")).to\
      route_to("sessions#create") }
end
