class MemberProjectSerializer < ApplicationSerializer
  attributes :id,
             :name,
             :project_code,
             :access_rights

  def access_rights
    project_member = object.members.find_by(user_id: @instance_options[:user].id)
    project_member.slice(:cms_module_access,
                         :dms_module_access,
                         :cms_module_master,
                         :dms_module_master)
                  .merge(admin: project_member.admin?)
  end
end
