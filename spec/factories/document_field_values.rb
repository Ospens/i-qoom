FactoryBot.define do
  factory :document_field_value do
    document_field
    value { "MyString" }
    title { "MyString" }
    position { 1 }
  end
end
