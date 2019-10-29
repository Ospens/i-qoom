class Api::V1::MessagesController < ApplicationController
  load_and_authorize_resource

  def show
    @message.mark_as_read!(signed_in_user.id)
    render json: @message,
           user: signed_in_user
  end

  def inbox
    render json: signed_in_user.received_messages,
           user: signed_in_user
  end

  def sent
    render json: signed_in_user.sent_messages,
           user: signed_in_user
  end

  def create
    @message = signed_in_user.sent_messages.new(message_params)
    if @message.save
      render json: @message
    else
      render json: @message.errors,
             status: :unprocessable_entity
    end
  end

  private

  def message_params
    if params[:message][:message_recipients].present?
      params[:message][:message_recipients_attributes] =
        params[:message][:message_recipients]
      params[:message].delete(:message_recipients)
    end
    params.fetch(:message,
                 { }).permit(:subject,
                             :body,
                             message_recipients_attributes: [
                              :id,
                              :user_id ])
  end
end