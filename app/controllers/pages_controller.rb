class PagesController < ApplicationController
  skip_authorization_check
  def home
    user_email = 
      signed_in_user.present? ? { hello: signed_in_user.email } : {}
    render json: { status: "success" }.merge(user_email),
           status: :ok
  end

  def index; end
end
