class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable

  acts_as_reader

  attr_accessor :accept_terms_and_conditions, :project_member_id

  has_many :projects

  has_many :project_members

  has_many :project_administrators,
           -> { admins },
           class_name: "ProjectMember"

  has_many :documents, class_name: 'DocumentMain'
  has_many :document_rights,
           as: :parent,
           index_errors: true,
           dependent: :destroy
  accepts_nested_attributes_for :document_rights
  has_many :document_folders
  has_many :document_review_subjects
  has_many :document_review_comments
  has_many :document_review_owners
  has_and_belongs_to_many :dms_teams

  has_many :sent_messages,
           class_name: "Message",
           foreign_key: 'sender_id'

  has_many :message_recipients

  has_many :received_messages,
           through: :message_recipients,
           source: :message

  validates_presence_of :password_confirmation,
    if: -> { password.present? }

  validates :first_name,
            :last_name,
            presence: true,
            length: { minimum: 2,
                      maximum: 255 }

  validates :accept_terms_and_conditions,
    acceptance: true,
    allow_nil: false,
    on: :create

  validates_inclusion_of :country,
    in: ISO3166::Country.codes

  validates :username,
            format: { with: /^[a-zA-Z0-9_\.\-]*$/,
                      multiline: true },
            presence: true,
            length: { maximum: 18 },
            uniqueness: true

  before_validation :add_data_from_project_member,
                    on: :create,
                    if: -> { project_member_id.present? }
  after_create :generate_member_id
  after_create :send_confirmation_email,
               unless: -> { confirmed? || project_member_id.present? }
  after_create :add_user_id_to_project_member, if: -> { project_member_id.present? } 

  def member_projects
    Project.joins(:members)
           .where(project_members: {
             user_id: self.id,
             creation_step: ProjectMember.creation_steps["active"]
           })
  end

  def admin_projects
    member_projects.joins(members: :role)
                   .where(roles: { 
                     title: "Project Administrator"
                   })
  end

  def confirmed?
    confirmed_at.present?
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def send_confirmation_email
    self.confirmation_sent_at = Time.now
    ApplicationMailer.user_confirmation(self).deliver_now
  end

  def confirmation_token
    ::JsonWebToken.encode(user_id: id, email: email)
  end

  def generate_reset_password_token
    update(reset_password_token:   SecureRandom.hex(10),
           reset_password_sent_at: Time.now)
  end

  def reset_password
    generate_reset_password_token
    ApplicationMailer.reset_password_instructions(self).deliver_now
  end

  private

  def generate_member_id
    self.member_id = "i-" + (first_name.first + last_name.first).upcase + id.to_s.rjust(5, '0')
    self.save
  end

  def add_data_from_project_member
    project_member = ProjectMember.find_by(id: project_member_id)
    assign_attributes(
      first_name: project_member.first_name,
      last_name: project_member.last_name,
      country: project_member.company_address.country,
      city: project_member.company_address.city,
      username: (project_member.email.split("@").first.sub(".", "_") + project_member.id.to_s)[0..17],
      email: project_member.email,
      confirmed_at: Time.now
    )
  end

  def add_user_id_to_project_member
    ProjectMember.find_by(id: project_member_id).update(user_id: id)
  end
end
