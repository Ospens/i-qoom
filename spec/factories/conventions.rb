FactoryBot.define do
  factory :convention do
    project

    before(:create) do |instance|
      instance.build_default_fields
      instance.document_fields.each do |field|
        field.document_field_values.new(value: Faker::Name.initials(3), position: 1)
      end
    end
  end
end
