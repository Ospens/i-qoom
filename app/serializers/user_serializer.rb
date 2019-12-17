class UserSerializer < ApplicationSerializer
  attributes :first_name, :last_name, :username, :email, :member_id
end