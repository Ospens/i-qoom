class Api::V1::DisciplinesController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource :discipline,
                              through: :project
end