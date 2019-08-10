class RoleSerializer < ApplicationSerializer
  attribute :id, key: :value
  attribute :title
end