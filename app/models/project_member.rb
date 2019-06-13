class ProjectMember < ApplicationRecord

  enum employment_type: [ :employee,
                          :internal_contractor,
                          :external_contractor]

  enum company_type: [ :project_company,
                       :parent_compny,
                       :joint_venture_company]

  before_create :add_user

  belongs_to :project,
    inverse_of: :members

  belongs_to :user, required: false

  validates :email,
            email: true,
            presence: true

  protected

  # adds a user only when it is being created,
  # then a user can be changed only by confirmation
  def add_user
    self.user = User.find_by(email: email) if user.nil?
  end
end
