class Project < ApplicationRecord
  enum creation_step: [ :admins,
                        :name,
                        :company_data,
                        :billing_address,
                        :done ],
                      _prefix: true

  after_save :update_creation_step_to_done, unless: :creation_step_done?

  after_update :send_confirmation_emails, if: :creation_step_done?

  validates :name,
            presence: true,
            length: { minimum: 3,
                      maximum: 255 },
            unless: :creation_step_admins?

  belongs_to :user

  has_many :conventions

  has_many :document_mains

  has_many :documents

  has_many :dms_settings

  accepts_nested_attributes_for :dms_settings

  has_many :admins, class_name: "ProjectAdministrator"
  has_many :members, class_name: "ProjectMember"
  has_one :company_data, class_name: "ProjectCompanyData"

  accepts_nested_attributes_for :admins
  accepts_nested_attributes_for :company_data,
                                update_only: true

  validates_presence_of :admins

  validates_presence_of :company_data,
    unless: -> { creation_step_admins? || creation_step_name? }

  private

  def update_creation_step_to_done
    update(creation_step: "done")
    self.reload if creation_step_done?
  end

  def send_confirmation_emails
    admins.unconfirmed.where(first_confirmation_sent_at: nil).each do |admin|
      admin.send_confirmation_email
    end
  end
end
