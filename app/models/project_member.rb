class ProjectMember < ApplicationRecord

  enum creation_step: [ :employment_type,
                        :company_type,
                        :company_data,
                        :details,
                        :completed ],
                      _prefix: true

  enum employment_type: [ :employee,
                          :internal_contractor,
                          :external_contractor],
                      _prefix: true

  enum company_type: [ :project_company,
                       :parent_company,
                       :joint_venture_company],
                      _prefix: true

  # before_create :add_user

  belongs_to :project,
    inverse_of: :members

  belongs_to :user, required: false

  belongs_to :company_address,
             class_name: "Address",
             required: false

  accepts_nested_attributes_for :company_address,
                                update_only: true

  # employment_type first step
  validates :employment_type,
            presence: true

  # company_type second step
  validates :company_type,
            presence: true,
            unless: :creation_step_employment_type?

  # company_data third step
  validates :company_address,
            presence: true,
            unless: -> {
              creation_step_employment_type? ||
              creation_step_company_type?
            }
  # details
  with_options if: -> {
                 creation_step_details? ||
                 creation_step_completed?
               } do
    validates :email,
              email: true,
              presence: true

    validates :first_name,
              :last_name,
              presence: true,
              length: { minimum: 3,
                        maximum: 255 }
  end

  protected

  # # adds a user only when it is being created,
  # # then a user can be changed only by confirmation
  # def add_user
  #   self.user = User.find_by(email: email) if user.nil?
  # end
end
