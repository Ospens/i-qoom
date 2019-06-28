FactoryBot.define do
  factory :convention do
    association :project, factory: :project_done_step

    before(:create) do |instance|
      instance.build_default_fields
      instance.document_fields.each do |field|
        next unless field.select_field?
        field.document_field_values.new(value: Faker::Name.initials(3), position: 1)
      end
    end
  end
end
