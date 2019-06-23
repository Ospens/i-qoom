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
                       :parent_compny,
                       :joint_venture_company],
                      _prefix: true

  # before_create :add_user

  belongs_to :project,
    inverse_of: :members

  belongs_to :user, required: false

  # validates :email,
  #           email: true,
  #           presence: true

  validates :employment_type,
            presence: true


  protected

  # # adds a user only when it is being created,
  # # then a user can be changed only by confirmation
  # def add_user
  #   self.user = User.find_by(email: email) if user.nil?
  # end
end
