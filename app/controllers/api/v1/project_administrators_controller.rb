class Api::V1::ProjectAdministratorsController < ApplicationController
  load_and_authorize_resource :project_administrator

  def destroy
    if @project_administrator.remove
      success(:created)
    else
      error(@project_administrator)
    end
  end

end