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

  after_save :update_creation_step_to_pending,
             unless: -> { creation_step_active? ||
                          creation_step_pending? }

  # before_create :add_user

  belongs_to :project,
    inverse_of: :members

  belongs_to :user, required: false

  belongs_to :company_address,
             class_name: "Address",
             required: false,
             inverse_of: :project_member

  validates :job_title,
            length: { maximum: 255 }

  belongs_to :discipline, required: false
  belongs_to :role, required: false

  accepts_nested_attributes_for :company_address,
                                update_only: true

  # employment_type first step
  validates :employment_type,
            presence: true

  # company_type second step
  validates :company_type,
            presence: true,
            unless: -> { creation_step.nil? ||
                         creation_step_employment_type? }

  # company_data third step
  validates :company_address,
            presence: true,
            if: -> {
              creation_step_company_data? ||
              creation_step_details? ||
              creation_step_pending?
            }
  # details fourth step
  with_options if: -> {
                 creation_step_details? ||
                 creation_step_pending?
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

  private

  def update_creation_step_to_pending
    update(creation_step: "pending")
    self.reload if creation_step_pending?
  end

  # # adds a user only when it is being created,
  # # then a user can be changed only by confirmation
  # def add_user
  #   self.user = User.find_by(email: email) if user.nil?
  # end
end
