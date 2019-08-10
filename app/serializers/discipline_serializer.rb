class DisciplineSerializer < ApplicationSerializer
  attribute :id, key: :value
  attribute :title
end