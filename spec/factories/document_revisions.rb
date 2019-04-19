FactoryBot.define do
  factory :document_revision do
    document_main
    user
    project
  end
end
