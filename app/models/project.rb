class Project < ApplicationRecord
  enum creation_step: [ :admins,
                        :name,
                        :company_data,
                        :billing_address,
                        :done ],
                      _prefix: true

  attr_accessor :admins_inviter_id

  belongs_to :user

  has_many :conventions

  has_many :document_mains

  has_many :documents

  has_many :dms_settings

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

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 },
            unless: :creation_step_admins?

  validates :project_code,
            length: { is: 3 },
            format: { with: /\A[A-Z]+\z/ },
            if: -> { !project_code.nil? || !project_code_was.nil? }

  before_create :add_creator_as_admin_and_member

  after_save :update_creation_step_to_done, unless: :creation_step_done?

  after_save :invite_admins, if: :creation_step_done?

  def invite_members(ids, inviter_id)
    members = self.members.where(id: ids).where.not(creation_step: "active")
    if members.present?
      members.each do |member|
        member.inviter_id = inviter_id
        member.send_confirmation_email
      end
      true
    else
      false
    end
  end

  private

  def add_creator_as_admin_and_member
    first_admin = admins.try(:first)
    admins.clear
    admins.build(email: user.email,
                 user_id: user.id,
                 status: "active")
    members.build(creator: true,
                  email: user.email,
                  user_id: user.id,
                  creation_step: "active",
                  first_name: user.first_name,
                  last_name: user.last_name,
                  cms_module_access: true,
                  dms_module_access: true,
                  cms_module_master: true,
                  dms_module_master: true)
    admins << first_admin if first_admin.present?
  end

  def update_creation_step_to_done
    update(creation_step: "done")
    self.reload if creation_step_done?
  end

  def invite_admins
    admins.unconfirmed.where(first_confirmation_sent_at: nil).each do |admin|
      admin.inviter_id = user.id if admin.inviter_id.nil?
      admin.inviter_id = admins_inviter_id if admins_inviter_id.present?
      admin.send_confirmation_email
    end
  end
end
