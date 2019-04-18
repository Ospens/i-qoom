FactoryBot.define do
  factory :project_company_datum do
    vat_id      { "fsdfsdf" }
    project { FactoryBot.build(:project, creation_step: :company_datum) }
    association :company_address, factory: :address
    association :billing_address, factory: :address
  end
end
