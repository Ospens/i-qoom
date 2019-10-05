class Api::V1::MessagesController < ApplicationController
  load_and_authorize_resource

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
    params.fetch(:message,
                 { }).permit(:subject,
                             :body,
                             :recipient_id)
  end
end