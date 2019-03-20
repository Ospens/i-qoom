class Api::V1::UsersController < ApplicationController
  skip_authorization_check

  def create
    user = User.new(user_params)
    if user.save
      success(:created)
    else
      error(user)
    end
  end

  def update
    render json: {}, status: :not_implemented
  end

  def destroy
    render json: {}, status: :not_implemented
  end

  private

  def user_params
    params.require(:user).permit(:first_name,
                                 :last_name,
                                 :country,
                                 :state,
                                 :city,
                                 :username,
                                 :email,
                                 :password,
                                 :password_confirmation,
                                 :accept_terms_and_conditions)
  end

end
