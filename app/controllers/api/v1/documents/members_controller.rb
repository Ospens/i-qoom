class Api::V1::Documents::MembersController < ApplicationController
  load_resource :project

  def show
    authorize! :show_member, Document.new, @project
    @user = User.find(params[:id])
    render formats: :json
  end
end
