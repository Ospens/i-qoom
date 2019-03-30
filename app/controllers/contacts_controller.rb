class ContactsController < ApplicationController
  skip_authorization_check
  def create
    contact = Contact.new(contact_params)
    if contact.valid?
      ApplicationMailer.send_contact_form(contact).deliver_now
      success(:created)
    else
      error(contact)
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :phone_number, :text)
  end

end
