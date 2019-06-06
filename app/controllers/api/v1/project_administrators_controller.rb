class Api::V1::ProjectAdministratorsController < ApplicationController
  load_and_authorize_resource :project_administrator

  def resend_confirmation
    @project_administrator.send_confirmation_email
    success(:ok)
  end

  def destroy
    if @project_administrator.remove
      success(:ok)
    else
      error(@project_administrator)
    end
  end

end