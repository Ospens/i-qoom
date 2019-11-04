class ProjectCompanyData < ApplicationRecord
  attr_accessor :same_for_billing_address, :remove_logo

  has_one_attached :logo

  belongs_to :project

  belongs_to :company_address,
    class_name: "Address",
    inverse_of: :project_company_data
  belongs_to :billing_address,
    class_name: "Address",
    inverse_of: :project_company_billing_data,
    required: false


  accepts_nested_attributes_for :company_address,
                                :billing_address,
                                update_only: true

  validates_presence_of :vat_id

  validates_presence_of :billing_address,
    if: -> { project.present? &&
             ( project.creation_step_billing_address? ||
               project.creation_step_done? ) }

  before_validation :add_billing_address,
    if: -> { same_for_billing_address && !billing_address }


  after_validation :purge_logo,
    if: :remove_logo

  private

  def add_billing_address
    build_billing_address(company_address.attributes.except("id"))
  end

  def purge_logo
    logo.purge
  end

end
