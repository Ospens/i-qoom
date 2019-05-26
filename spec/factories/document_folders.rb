FactoryBot.define do
  factory :document_folder do
    project
    user
    title { "MyString" }
  end
end
