class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities

    # Project
    can :confirm_member, Project

    if user.present?
      # Project
      can :create, Project, user_id: user.id
      can :dms_users, Project do |project|
        project.members.find_by(user_id: user.id).try(:dms_module_access?)
      end
      can :manage, Project,
          id: user.project_administrators.map(&:project_id)
      # ProjectAdministrator
      can :manage, ProjectAdministrator,
          project: { id: user.project_administrators.map(&:project_id) }
      # ProjectMember
      can :manage, ProjectMember,
          project: { id: user.project_administrators.map(&:project_id) }
      # Discipline
      can :manage, Discipline,
          project: { id: user.project_administrators.map(&:project_id) }
      # Role
      can :manage, Role,
          project: { id: user.project_administrators.map(&:project_id) }
      # Message
      can [ :create,
            :inbox,
            :sent ], Message
      can :show, Message do |message|
        message.recipients.ids.include?(user.id) ||
          message.sender_id == user.id
      end
      # Convention
      can :update, Convention do |convention|
        # When i started testing, the first thing i did was to setup a project
        # (after i have registered). So i setup a project (project settings) and
        # then i saw that i could access the DMS immediately. This is fine, but
        # the user who creates a new project is automatically an administrator
        # of the project ( meaning also a member) and shall be shown as such.
        # So the project creator is automatically the first member of the
        # project with full access rights to all modules (at this stage we only
        # have one module, which is the DMS).
        # This means that he must be shown as a member and the boxes for access
        # rights to the DMS for "Document MS" and "Modul Master" must be active.
        # Hope this helps. (c) Yasser
        convention.project.members.find_by(user_id: user.id).try(:dms_module_master?)
      end
      can [:edit, :download_codification], Convention do |convention|
        convention.project.members.find_by(user_id: user.id).try(:dms_module_access?)
      end
      # Document
      can [:new, :create], Document do |document, project|
        project.can_create_documents?(user)
      end
      can [:show,
           :download_native_file,
           :download_details,
           :revisions,
           :revisions_and_versions], Document do |document|
        document.user == user ||
          document.can_view?(user)
      end
      can [:edit, :create_revision], Document do |document|
        document.user == user ||
          document.can_create?(user)
      end
      can :update, Document do |document|
        (document.user == user || document.can_create?(user)) &&
          document == document.revision.versions.last_version
      end
      can :collection_actions, Document do |document, project|
        member = project.members.find_by(user_id: user.id)
        member.try(:dms_module_access?) || member.try(:dms_module_master?)
      end
      can :show_member, Document do |document, project|
        project.members.find_by(user_id: user.id).try(:dms_module_master?)
      end
      # DmsSetting
      can [:edit, :update], DmsSetting
      # DocumentFolder
      can :manage, DocumentFolder, user_id: user.id
      # DocumentReviewSubject
      can [:new,
           :create,
           :show,
           :download_files], DocumentReviewSubject do |subject|
        subject.document_revision.last_version.can_view?(user)
      end
      can :update_status, DocumentReviewSubject do |subject|
        subject.document_revision.can_update_review_status?(user)
      end
      can :complete_review, DocumentReviewSubject do |subject|
        subject.can_complete_review?(user)
      end
      # DocumentReviewComment
      can [:new,
           :create,
           :download_file], DocumentReviewComment do |comment|
        comment.document_review_subject.document_revision.last_version.can_view?(user)
      end
      can :update, DocumentReviewComment, user_id: user.id
      # DocumentReviewOwner
      can :index, DocumentReviewOwner do |owner, project|
        project.members.find_by(user_id: user.id).try(:dms_module_master?)
      end
      can :update, DocumentReviewOwner do |owner|
        owner.project.members.find_by(user_id: user.id).try(:dms_module_master?)
      end
      # DocumentRevision
      can [:show,
           :review_show], DocumentRevision do |revision|
        revision.last_version.can_view?(user)
      end
      can :update_review_status, DocumentRevision do |revision|
        revision.can_update_review_status?(user)
      end
      can [:review_menu,
           :review_index], DocumentRevision do |revision, project|
        project.members.find_by(user_id: user.id).try(:dms_module_access?)
      end
      # DocumentReviewTag
      can :manage, DocumentReviewTag do |tag, project|
        project.members.find_by(user: user).try(:dms_module_master?)
      end
      can :manage, DmsTeam do |team, project|
        project.members.find_by(user: user).try(:dms_module_master?)
      end
    end
  end
end
