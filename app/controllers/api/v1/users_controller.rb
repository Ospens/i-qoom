class Api::V1::UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      success(:created)
    else
      error(user)
    end
  end

  def update

  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
