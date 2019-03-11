class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def success(status)
    render json: { status: "success",
                   message: t(".success_message") },
           status: status
  end

  def error(record)
    render json: { status: "error",
                   message: t(".error_message"),
                   error_messages: record.errors.full_messages,
                   fields_with_errors: record.errors.messages.keys },
           status: :ok
  end

end
