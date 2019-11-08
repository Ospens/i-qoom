class Project < ApplicationRecord
  enum creation_step: [ :admins,
                        :name,
                        :company_data,
                        :billing_address,
                        :done ],
                      _prefix: true

  enum status: [ :planning,
                 :development,
                 :execution,
                 :operation ]

  attr_accessor :admins_inviter_id

  belongs_to :user

  has_many :conventions,
           dependent: :destroy

  has_many :document_mains

  has_many :documents

  has_many :dms_settings

  has_many :dms_teams

  has_many :document_review_owners

  has_many :document_review_tags

  has_many :admins, class_name: "ProjectAdministrator", index_errors: true
  has_many :members, class_name: "ProjectMember"
  has_one :company_data, class_name: "ProjectCompanyData"
  has_many :disciplines
  has_many :roles

  accepts_nested_attributes_for :dms_settings
  accepts_nested_attributes_for :admins
  accepts_nested_attributes_for :company_data,
                                update_only: true

  validates_presence_of :admins

  validates_presence_of :company_data,
    unless: -> { creation_step_admins? || creation_step_name? }

  validates_associated :company_data

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 },
            unless: :creation_step_admins?

  validates :project_code,
            length: { is: 3 },
            format: { with: /\A[A-Z]+\z/ },
            if: -> { !project_code.nil? || !project_code_was.nil? }

  before_validation :add_creator_as_admin, on: :create

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
    !members.find_by(user: user).try(:dms_module_master?).nil?
  end

  def dms_access?(user)
    !members.find_by(user: user).try(:dms_module_access?).nil?
  end

  def can_create_documents?(user)
    # user cannot create document if he has no access to at least one value
    # for each field that can be limited by value.
    # when creating document we check current active convention
    !conventions.active.document_fields.limit_by_value.map do |field|
      field.document_rights.where(parent: user,
                                  limit_for: :value,
                                  enabled: true,
                                  view_only: false).any?
    end.include?(false) || dms_master?(user)
  end

  def dms_users
    project_members = members.where(dms_module_access: true)
    User.where(id: project_members.pluck(:user_id))
  end

  private

  def add_creator_as_admin
    first_admins = admins.map { |a| a }
    admins.clear
    admins.build(email: user.email,
                 first_name: user.first_name,
                 last_name: user.last_name,
                 username: user.username,
                 user_id: user.id,
                 status: "active")
    admins << first_admins
  end

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
      "Management",
      "Document Management",
      "Human Ressources",
      "Electrical",
      "Mechanical",
      "Civil",
      "Logistics",
      "Construction",
      "Cross Discipline",
      "Infrastructure",
      "Finance",
      "Commercial" ].each do |title|
      self.disciplines.create(title: title)
    end

    [ "Project Administrator",
      "Project Lead",
      "Project Manager",
      "Package Manager",
      "Engineering Manager",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "Process Manager",
      "Interface Manager",
      "Commercial Manager",
      "Contract Manager",
      "Logistics Manager",
      "Legal Advisor",
      "Scheduler",
      "IT Expert",
      "Admin Support",
      "HR Manager",
      "Secretary",
      "Development Manager",
      "Finance Manager",
      "Controller",
      "Document Manager",
      "Procurement Manager",
      "Procurement Lead",
      "Accountant" ].each do |title|
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
