class SessionSerializer < ApplicationSerializer
  attributes :auth_token

  has_one :user
end