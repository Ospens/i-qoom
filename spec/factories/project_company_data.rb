FactoryBot.define do
  factory :project_company_datum do
    vat_id      { "fsdfsdf" }
    project     { FactoryBot.build(:project_name_step, creation_step: :company_datum) }
    association :company_address, factory: :address
    association :billing_address, factory: :address
  end
  factory :project_company_datum_without_billing_address,
          class: "ProjectCompanyDatum" do
    vat_id      { "fsdfsdf" }
    project     { FactoryBot.build(:project_name_step, creation_step: :company_datum) }
    association :company_address, factory: :address
  end
  factory :project_company_datum_billing_address_step,
          class: "ProjectCompanyDatum" do
    vat_id      { "fsdfsdf" }
    project     { FactoryBot.build(:project_name_step, creation_step: :billing_address) }
    association :company_address, factory: :address
    association :billing_address, factory: :address
  end
  factory :project_company_datum_for_project,
          class: "ProjectCompanyDatum" do
    vat_id      { "fsdfsdf" }
    association :company_address, factory: :address
    association :billing_address, factory: :address
  end
end
