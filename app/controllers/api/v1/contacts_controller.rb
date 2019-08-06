class Api::V1::ContactsController < ApplicationController
  skip_authorization_check
  def create
    contact = Contact.new(contact_params)
    if contact.valid?
      ApplicationMailer.send_contact_form(contact).deliver_now
      head :created
    else
      render json: contact.errors,
             status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :phone_number, :text)
  end

end
