class CreateJoinTableDmsTeamsUsers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :dms_teams, :users do |t|
      t.index [:dms_team_id, :user_id]
      t.index [:user_id, :dms_team_id]
    end
  end
end
