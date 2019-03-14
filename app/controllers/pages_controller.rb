class PagesController < ApplicationController
  skip_authorization_check
  def home
    user_email = 
      if signed_in_user.present?
        { hello: signed_in_user.email }
      end
    render json: { status: "success" }.merge(user_email),
           status: :ok
  end
end
