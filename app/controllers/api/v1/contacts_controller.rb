class Api::V1::ContactsController < ApplicationController

  def create
    @contact = Contact.new(contact_params)
    if @contact.valid?
      ApplicationMailer.send_contact_form(@contact).deliver_now
      success
    else
      error(@contact)
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :phone_number, :text)
  end

end
