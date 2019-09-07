class AddModulAccessToProjectMember < ActiveRecord::Migration[5.2]
  def change
    add_column :project_members, :cms_modul_access, :boolean, default: false
    add_column :project_members, :dms_modul_access, :boolean, default: false
    add_column :project_members, :cms_modul_master, :boolean, default: false
    add_column :project_members, :dms_modul_master, :boolean, default: false
  end
end
