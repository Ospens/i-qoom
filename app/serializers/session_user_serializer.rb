class SessionUserSerializer < ApplicationSerializer
  attributes :first_name,
             :last_name,
             :username,
             :email,
             :member_id,
             :module_access

  def module_access
    projects = object.member_projects.creation_step_done
    { cms_module_access:
        projects.where(project_members: { cms_module_access: true })
                .ids,
      dms_module_access:
        projects.where(project_members: { dms_module_access: true })
                .ids,
      cms_module_master: 
        projects.where(project_members: { cms_module_master: true })
                .ids,
      dms_module_master: 
        projects.where(project_members: { dms_module_master: true })
                .ids }
  end
end