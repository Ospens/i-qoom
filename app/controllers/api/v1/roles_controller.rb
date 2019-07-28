class Api::V1::RolesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :role,
                              through: :project

end