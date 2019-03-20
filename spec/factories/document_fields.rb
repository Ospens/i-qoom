FactoryBot.define do
  factory :document_field do
    parent { create(:convention) }
    kind { :text_field }
    column { 1 }
    value { '1' }
  end
end
