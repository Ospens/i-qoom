class Project < ApplicationRecord
  enum creation_step: [ :name,
                        :company_data,
                        :billing_address,
                        :done ],
                      _prefix: true

  enum status: [ :planning,
                 :development,
                 :execution,
                 :operation ]

  belongs_to :user

  has_many :conventions,
           dependent: :destroy

  has_many :document_mains

  has_many :documents

  has_many :dms_settings

  has_many :dms_teams

  has_many :dms_planned_lists

  has_many :document_review_owners

  has_many :document_review_tags

  has_many :admins,
           -> { admins },
           class_name: "ProjectMember"
  has_many :members, class_name: "ProjectMember"
  has_one :company_data, class_name: "ProjectCompanyData"
  has_many :disciplines
  has_many :roles

  accepts_nested_attributes_for :dms_settings
  accepts_nested_attributes_for :company_data,
                                update_only: true

  validates_presence_of :admins, on: :update

  validates_presence_of :company_data,
    unless: :creation_step_name?

  validates_associated :company_data

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 }

  validates :project_code,
            length: { is: 3 },
            format: { with: /\A[A-Z]+\z/ },
            if: -> { !project_code.nil? || !project_code_was.nil? }

  after_save :update_creation_step_to_done, unless: :creation_step_done?

  after_create :create_conventions

  after_create :add_default_disciplines_and_roles

  after_create :add_creator_as_member

  def invite_members(ids, inviter_id)
    members = self.members.where(id: ids).where.not(creation_step: "active")
    if members.present?
      members.each do |member|
        member.inviter_id = inviter_id
        member.send_confirmation_email
        member.save
      end
      true
    else
      false
    end
  end

  def dms_master?(user)
    members.find_by(user: user).try(:dms_module_master?) == true
  end

  def dms_access?(user)
    members.find_by(user: user).try(:dms_module_access?) == true
  end

  def can_create_documents?(user)
    # user cannot create document if he has no access to at least one value
    # for each field that can be limited by value.
    # when creating document we check current active convention
    fields = conventions.active.document_fields.limit_by_value
    team = dms_teams.joins(:users).where(users: { id: user.id }).first
    !fields.map do |field|
      field.document_rights.where(parent: user,
                                  limit_for: :value,
                                  enabled: true,
                                  view_only: false).any?
    end.include?(false) ||
      (team.present? &&
        !fields.map do |field|
          team.document_rights.where(document_field: field,
                                     limit_for: :value,
                                     enabled: true,
                                     view_only: false).any?
        end.include?(false)) ||
      dms_master?(user)
  end

  def dms_users
    project_members = members.where(dms_module_access: true)
    User.where(id: project_members.pluck(:user_id))
  end

  private

  def update_creation_step_to_done
    update(creation_step: "done")
    self.reload if creation_step_done?
  end

  def create_conventions
    conventions.create(number: 1)
    # there will be other conventions
  end

  def add_default_disciplines_and_roles
    [ "i-Qoom Admin",
      "Civil",
      "Commercial",
      "Construction",
      "Cross Discipline",
      "Document Management",
      "Electrical",
      "Finance",
      "Human Ressources",
      "Infrastructure",
      "Logistics",
      "Management",
      "Mechanical"].each do |title|
      self.disciplines.create(title: title)
    end

    [ "Project Administrator",
      "Accountant",
      "Admin Support",
      "Civil Engineer",
      "Commercial Manager",
      "Contract Manager",
      "Controller",
      "Development Manager",
      "Document Manager",
      "Electrical Engineer",
      "Engineering Manager",
      "Finance Manager",
      "HR Manager",
      "IT Expert",
      "Interface Manager",
      "Legal Advisor",
      "Logistics Manager",
      "Mechanical Engineer",
      "Package Manager",
      "Process Manager",
      "Procurement Lead",
      "Procurement Manager",
      "Project Lead",
      "Project Manager",
      "Scheduler",
      "Secretary"].each do |title|
      self.roles.create(title: title)
    end
  end

  def add_creator_as_member
    members.create(creator: true,
                   email: user.email,
                   user_id: user.id,
                   creation_step: "active",
                   first_name: user.first_name,
                   last_name: user.last_name,
                   cms_module_access: true,
                   dms_module_access: true,
                   cms_module_master: true,
                   dms_module_master: true,
                   role_id: roles.find_by(title: "Project Administrator").id,
                   discipline_id: disciplines.find_by(title: "i-Qoom Admin").id)
  end
end
