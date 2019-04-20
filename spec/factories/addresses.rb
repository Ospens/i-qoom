FactoryBot.define do
  factory :address do
    sequence(:company_name)   { Faker::Company.name }
    sequence(:street)         { Faker::Address.street_name }
    sequence(:house_number)   { rand(1..99) }
    sequence(:city)           { Faker::Address.city }
    sequence(:postcode)       { Faker::Address.zip_code }
    sequence(:country)        { ISO3166::Country.codes.sample }
    factory :address_with_project_company_datum do
      association :project_company_datum
    end
    factory :address_with_project_company_billing_datum do
      association :project_company_datum
    end
  end
end