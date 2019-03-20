FactoryBot.define do
  factory :convention_field do
    convention
    kind { :text_field }
    column { 1 }
    value { '1' }
  end
end
