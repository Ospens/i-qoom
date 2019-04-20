FactoryBot.define do
  factory :document_version do
    user
    project
    revision { create(:document_revision) }
  end
end
