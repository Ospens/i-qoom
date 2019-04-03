class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  check_authorization

  rescue_from CanCan::AccessDenied do |exception|
    render json: { status: "forbidden",
                   message: t("access_denied") },
           status: :forbidden
  end

  protected

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
           status: :unprocessable_entity
  end

  def create_or_update(record)
    if record
      success(:created)
    else
      error(record)
    end
  end

  def signed_in_user
    data = ::JsonWebToken.decode(request.headers["Authorization"])
    if data.present? && Time.now < Time.at(data["exp"])
      User.find_by(id: data["user_id"])
    end
  end

  def current_ability
    @current_ability ||= Ability.new(signed_in_user)
  end

end
