json.first_name @user.first_name
json.last_name @user.last_name
json.email @user.email
json.username @user.username
json.city @user.city
json.country @user.country
json.state @user.state
fields = @project.conventions.active.document_fields
json.rights do
  [:originating_company, :discipline, :document_type].each do |kind|
    json.set! kind do
      json.array!(fields.find_by(codification_kind: kind).document_rights.where(parent: @user).map do |right|
        "#{right.document_field_value.value} #{right.document_field_value.title}"
      end)
    end
  end
end
json.teams do
  json.array!(@project.dms_teams.joins(:users).where(users: { id: @user.id }).map do |team|
    { name: team.name,
      users: team.users.as_json(only: [:id, :first_name, :last_name]) }
  end)
end
