class ContactsController < ApplicationController

  def create
    @contact = Contact.new(contact_params)
    if @contact.valid?
      ApplicationMailer.send_contact_form(@contact).deliver_now
      render json: { status: "success",
                     message: t(".success_message") },
             status: :ok
    else
      render json: { status: "error",
                     message: t(".error_message"),
                     error_messages: @contact.errors.full_messages,
                     fields_with_errors: @contact.errors.messages.keys },
             status: :ok
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :phone_number, :text)
  end

end