class DisciplineSerializer < ApplicationSerializer
  attributes :id, :title, :value

  def value
    object.id
  end
end