class ProjectMember < ApplicationRecord

  enum creation_step: [ :employment_type,
                        :company_type,
                        :details,
                        :company_datum,
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

  # validates :email,
  #           email: true,
  #           presence: true

  # employment_type first step
  validates :employment_type,
            presence: true

  # company_type second step
  validates :company_type,
            presence: true,
            unless: :creation_step_employment_type?

  protected

  # # adds a user only when it is being created,
  # # then a user can be changed only by confirmation
  # def add_user
  #   self.user = User.find_by(email: email) if user.nil?
  # end
end
