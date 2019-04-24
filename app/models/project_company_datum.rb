class ProjectCompanyDatum < ApplicationRecord
  attr_accessor :same_for_billing_address

  before_validation :check_if_same_for_billing_address

  belongs_to :project

  belongs_to :company_address,
    class_name: "Address",
    inverse_of: :project_company_datum
  belongs_to :billing_address,
    class_name: "Address",
    inverse_of: :project_company_billing_datum,
    required: false

  accepts_nested_attributes_for :company_address,
                                :billing_address,
                                update_only: true

  validates_presence_of :vat_id

  validates_presence_of :billing_address,
    if: -> { project.present? && project.creation_step_billing_address? }

  private

  def check_if_same_for_billing_address
    if same_for_billing_address
      build_billing_address(company_address.attributes.except("id"))
    end
  end

end
