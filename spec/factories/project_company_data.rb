FactoryBot.define do
  factory :project_company_datum do
    vat_id      { "fsdfsdf" }
    association :company_address, factory: :address
    association :billing_address, factory: :address
    factory :project_company_datum_without_billing_address do
      project     { FactoryBot.build(:project_name_step,
                                     creation_step: :company_datum) }
      billing_address { nil }
    end
    factory :project_company_datum_billing_address_step do
      project { FactoryBot.build(:project_name_step,
                                 creation_step: :billing_address) }
    end
  end
end
