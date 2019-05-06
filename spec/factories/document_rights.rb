FactoryBot.define do
  factory :document_right do
    limit_for { :field }
    user
    document_field
    document_field_value
  end
end
