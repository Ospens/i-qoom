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
    if user.present?
      # Project
      can :create, Project, user_id: user.id
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
      # Convention
      can :manage, Convention do |convention|
        convention.project.user == user
      end
      # Document
      can [:new, :create], Document do |document|
        document.can_create?(user)
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
      can [:index,
           :download_native_files,
           :download_list,
           :my_documents], Document # there should be some limitation
      can :update, Document do |document|
        (document.user == user || document.can_create?(user)) &&
          document == document.revision.versions.last_version
      end
      # DmsSetting
      can [:edit, :update], DmsSetting
      # DocumentFolder
      can :manage, DocumentFolder, user_id: user.id
      # DocumentReviewSubject
      can [:new,
           :create,
           :show], DocumentReviewSubject do |subject|
        subject.document_revision.last_version.can_view?(user)
      end
      # DocumentReviewComment
      can [:new,
           :create,
           :download_file], DocumentReviewComment do |comment|
        comment.document_review_subject.document_revision.last_version.can_view?(user)
      end
      can :update, DocumentReviewComment, user_id: user.id
      # DocumentRevision
      can [:show], DocumentRevision do |revision|
        revision.last_version.can_view?(user)
      end
    end
  end
end
