class Api::V1::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: "success",
                     message: t(".success_message") },
             status: :ok  
    else
      render json: { status: "error",
                     message: t(".error_message"),
                     error_messages: @user.errors.full_messages,
                     fields_with_errors: @user.errors.messages.keys },
             status: :ok
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
