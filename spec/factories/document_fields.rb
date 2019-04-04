FactoryBot.define do
  factory :document_field do
    parent { create(:convention) }
    kind { :text_field }
    column { 1 }
    value { '1' }

    after(:build) do |instance|
      instance.document_field_values.new(attributes_for(:document_field_value))
    end
  end
end
