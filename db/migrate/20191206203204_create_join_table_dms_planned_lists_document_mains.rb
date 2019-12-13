class CreateJoinTableDmsPlannedListsDocumentMains < ActiveRecord::Migration[5.2]
  def change
    create_join_table :dms_planned_lists, :document_mains do |t|
      t.index [:dms_planned_list_id, :document_main_id], name: 'index_dms_planned_lists_document_mains'
      t.index [:document_main_id, :dms_planned_list_id], name: 'index_document_mains_dms_planned_lists'
    end
  end
end
