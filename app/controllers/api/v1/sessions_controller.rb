class Api::V1::SessionsController < ApplicationController

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

  def destroy

  end

  private

  def session_params
    params.require(:session).permit(:login, :password)
  end

end