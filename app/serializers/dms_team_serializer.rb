class DmsTeamSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :users

  def users
    object.users.as_json(only: [:id, :first_name, :last_name, :username])
  end
end
