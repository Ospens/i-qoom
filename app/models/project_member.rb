class ProjectMember < ApplicationRecord

  enum creation_step: [ :employment_type,
                        :company_type,
                        :company_data,
                        :details,
                        :pending,
                        :active ],
                      _prefix: true

  enum employment_type: [ :employee,
                          :internal_contractor,
                          :external_contractor ],
                      _prefix: true

  enum company_type: [ :project_company,
                       :parent_company,
                       :joint_venture_company ],
                      _prefix: true

  attr_accessor :creator, :invite, :new_inviter_id

  belongs_to :project,
    inverse_of: :members

  belongs_to :user, required: false

  belongs_to :inviter,
             class_name: "User",
             required: false

  belongs_to :company_address,
             class_name: "Address",
             required: false,
             inverse_of: :project_member

  belongs_to :discipline, required: false
  belongs_to :role, required: false

  accepts_nested_attributes_for :company_address,
                                update_only: true

  validates :job_title,
            length: { maximum: 255 }
  
  validates_uniqueness_of :email,
                          scope: :project_id,
                          case_sensitive: false,
                          allow_nil: true

  # employment_type first step
  validates :employment_type,
            presence: true,
            unless: :creator?

  # company_type second step
  validates :company_type,
            presence: true,
            unless: -> { creation_step.nil? ||
                         creation_step_employment_type? ||
                         creator? }

  # company_data third step
  validates :company_address,
            presence: true,
            if: -> {
              (creation_step_company_data? ||
              creation_step_details? ||
              creation_step_pending? ||
              creation_step_active?) &&
              !creator?
            }
  # details fourth step
  with_options if: -> {
                 creation_step_details? ||
                 creation_step_pending? ||
                 creation_step_active?
               } do
    validates :email,
              email: true,
              presence: true

    validates :first_name,
              :last_name,
              presence: true,
              length: { minimum: 2,
                        maximum: 255 }
  end

  with_options if: -> {
    creation_step_active? &&
      project.admins.map(&:user_id).include?(user.try(:id))
  } do
    validates_acceptance_of :cms_module_access
    validates_acceptance_of :dms_module_access
    validates_acceptance_of :cms_module_master
    validates_acceptance_of :dms_module_master
  end

  validate :last_admin, if: :creation_step_active?, on: :update

  after_validation :set_module_access, 
                   if: :admin?

  before_save :send_confirmation_email,
              if: :invite
  before_save :add_user, if: -> { user.nil? && email.present? }
  
  after_save :update_creation_step_to_pending,
             unless: -> { creation_step_active? ||
                          creation_step_pending? }

  scope :admins,
        -> {
          joins(:role)
          .where(roles: { title: "Project Administrator" })
        }

  scope :active, -> { creation_step_active }

  def send_confirmation_email
    self.inviter_id = new_inviter_id if invite && new_inviter_id.present?
    self.confirmation_sent_at = Time.now
    ApplicationMailer.project_member_confirmation(self).deliver_now
    self.invite = false
  end

  def confirmation_token
    ::JsonWebToken.encode(member_id: id)
  end

  def creator?
    creator == true || project.try(:user) == user
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin?
    role.try(:title) == "Project Administrator"
  end

  private

  def last_admin
    if role.try(:title) != "Project Administrator" &&
       project.admins == [self]
      errors.add(:role, :last_admin_cant_be_removed)
    end
  end

  def update_creation_step_to_pending
    update(creation_step: "pending")
    self.reload if creation_step_pending?
  end

  # the user can't be changed by confirmation
  def add_user
    self.user = User.find_by("lower(email) = ? ", 
                             email.downcase)
  end

  def set_module_access
    self.cms_module_access = true
    self.dms_module_access = true
    self.cms_module_master = true
    self.dms_module_master = true
  end
end
