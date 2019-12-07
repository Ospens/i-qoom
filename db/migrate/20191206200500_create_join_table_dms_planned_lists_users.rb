class CreateJoinTableDmsPlannedListsUsers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :dms_planned_lists, :users do |t|
      t.index [:dms_planned_list_id, :user_id], name: 'index_dms_planned_lists_users'
      t.index [:user_id, :dms_planned_list_id], name: 'index_users_dms_planned_lists'
    end
  end
end
