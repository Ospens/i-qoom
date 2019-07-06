FactoryBot.define do
  factory :project_company_data do
    vat_id      { "fsdfsdf" }
    association :company_address, factory: :address
    association :billing_address, factory: :address
    factory :project_company_data_without_billing_address do
      project     { FactoryBot.build(:project_name_step,
                                     creation_step: :company_data) }
      billing_address { nil }
    end
    factory :project_company_data_billing_address_step do
      project { FactoryBot.build(:project_name_step,
                                 creation_step: :billing_address) }
    end
  end
end
