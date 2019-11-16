class Api::V1::Documents::MembersController < ApplicationController
  load_resource :project
  authorize_resource :project

  def show
    @user = User.find(params[:id])
    render formats: :json
  end
end
