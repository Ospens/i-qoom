class Api::V1::SessionsController < ApplicationController
  skip_authorization_check

  def create
    session = Session.new(session_params)
    if session.valid?
      render json: { status: "success",
                     auth_token: session.auth_token,
                     message: t(".success_message") },
             status: :created
    else
      error(session)
    end
  end

  # session is supposed to be destroyed on client-side
  # def destroy; end

  private

  def session_params
    params.require(:session).permit(:login, :password)
  end

end