FactoryBot.define do
  factory :document_email do
    document_email_groups { nil }
    email { "MyString" }
    users { nil }
  end
end
