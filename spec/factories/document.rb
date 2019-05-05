FactoryBot.define do
  factory :document do
    user
    project
    revision { create(:document_revision) }

    after(:build) do |instance|
      instance.document_fields
        .new(kind: :codification_field,
             codification_kind: :originating_company,
             column: 1,
             document_field_values_attributes:
                [{value: Faker::Name.initials(3), selected: true, position: 1}])
      instance.document_fields
        .new(kind: :codification_field,
             codification_kind: :discipline,
             column: 1,
             document_field_values_attributes:
                [{value: Faker::Name.initials(3), selected: true, position: 1}])
      instance.document_fields
        .new(kind: :codification_field,
             codification_kind: :document_type,
             column: 1,
             document_field_values_attributes:
                [{value: Faker::Name.initials(3), selected: true, position: 1}])
      instance.document_fields
        .new(kind: :codification_field,
             codification_kind: :document_number,
             column: 1,
             value: rand(1000..9999))
    end
  end
end
