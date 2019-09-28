include ActionDispatch::TestProcess::FixtureFile

module DocumentHelpers
  # if you want to use project.user from this method in request specs
  # you need to assign password to user like: project.user.password = 'password1'
  def document_attributes(user, suffix = true)
    project = FactoryBot.create(:project)
    main = project.document_mains.create
    rev = main.revisions.create
    convention = project.conventions.active
    convention.document_fields.each do |field|
      if field.select_field?
        value = field.document_field_values.first
        if field.can_limit_by_value?
          field.document_rights.create!(user: user,
                                        limit_for: :value,
                                        document_field_value: value,
                                        enabled: true)
        end
      end
    end
    doc_attrs = Document.build_from_convention(convention, user)
    doc_attrs['review_status'] = 'issued_for_information'
    doc_attrs['user_id'] = user.id
    doc_attrs['project_id'] = project.id
    doc_attrs['convention_id'] = convention.id
    doc_attrs['document_fields'].each do |field|
      if field['kind'] == 'select_field'
        value = field['document_field_values'].first
        value['selected'] = true
      elsif field['codification_kind'] == 'revision_number'
        field['value'] = '1'
      elsif field['kind'] == 'text_field' || field['kind'] == 'textarea_field'
        field['value'] = Faker::Name.initials
      elsif field['kind'] == 'date_field'
        field['value'] = Time.now.to_s
      elsif field['kind'] == 'upload_field'
        field['file'] = fixture_file_upload('spec/fixtures/test.txt')
      end
    end
    if suffix
      doc_attrs = assign_attributes_suffix_to_document(doc_attrs)
    end
    doc_attrs['document_revision_id'] = rev.id
    doc_attrs
  end

  def assign_attributes_suffix_to_document(attrs)
    attrs['document_fields_attributes'] = attrs.delete('document_fields')
    attrs['document_fields_attributes'].each do |field|
      next if field['document_field_values'].blank?
      field['document_field_values_attributes'] = field.delete('document_field_values')
    end
    attrs
  end
end
