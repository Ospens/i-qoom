FactoryBot.define do
  factory :document do
    user
    project
    revision { create(:document_revision) }
  end
end
