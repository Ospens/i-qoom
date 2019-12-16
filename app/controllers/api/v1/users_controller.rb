class Api::V1::UsersController < ApplicationController
  skip_authorization_check

  def create
    user = User.new(user_params)
    if user.save
      render json: user,
             status: :created
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

  def send_reset_password_instructions
    user = User.find_by(email: params[:email])
    if user.present?
      user.reset_password
      head 200
    else
      head 404
    end
  end

  def reset_password
    if params[:token].present?
      render json: { token: params[:token] }
    else
      head 404
    end
  end

  def update_password
    @user =
      User.find_by(reset_password_token: params[:token])
    if @user.present? &&
      (@user.reset_password_sent_at + 1.hour) > Time.now
      if @user.update(user_password_params)
        render json: @user
      else
        render json: @user.errors,
               status: :unprocessable_entity
      end
    else
      head :unprocessable_entity
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
                                 :accept_terms_and_conditions,
                                 :project_member_id)
  end

  def user_password_params
    params.require(:user).permit(:password,
                                 :password_confirmation)
  end
end
