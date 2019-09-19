class Api::V1::UsersController < ApplicationController
  skip_authorization_check

  def create
    user = User.new(user_params)
    if user.save
      head :created
    else
      render json: user.errors,
             status: :unprocessable_entity
    end
  end

  def update
    head 501
  end

  def destroy
    head 501
  end

  def confirm
    registration_confirmation =
      RegistrationConfirmation.new(token: params[:token])
    if registration_confirmation.save
      redirect_to '/signin/success/Succcessfully confirmed'
    else
      redirect_to '/signin/error/Not confirmed'
    end
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
