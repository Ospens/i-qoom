class PagesController < ApplicationController
  def home
    render json: { hello: :world }, status: :ok
  end
end
