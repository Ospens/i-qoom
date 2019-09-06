class RenameModulColumnsInProject < ActiveRecord::Migration[5.2]
  def change
    rename_column :project_members, :cms_modul_access, :cms_module_access
    rename_column :project_members, :dms_modul_access, :dms_module_access
    rename_column :project_members, :cms_modul_master, :cms_module_master
    rename_column :project_members, :dms_modul_master, :dms_module_master
  end
end
