include ActionDispatch::TestProcess::FixtureFile

module DocumentHelpers
  # if you want to use project.user from this method in request specs
  # you need to assign password to user like: project.user.password = 'password1'
  def document_attributes(user)
    project = FactoryBot.create(:project_done_step)
    main = project.document_mains.create
    rev = main.revisions.create
    convention = project.conventions.new
    convention.build_default_fields
    convention.document_fields.each do |field|
      if field.select_field?
        value = field.document_field_values.new(value: Faker::Name.initials(3), position: 1, title: '')
        if field.can_limit_by_value?
          field.document_rights.new(user: user,
                                    limit_for: :value,
                                    document_field_value: value,
                                    enabled: true)
        end
      end
    end
    convention.save
    doc_attrs = Document.build_from_convention(convention, user)
    doc_attrs['user_id'] = user.id
    doc_attrs['project_id'] = project.id
    doc_attrs['convention_id'] = convention.id
    doc_attrs['document_fields_attributes'].each do |field|
      if field['kind'] == 'select_field'
        value = field['document_field_values_attributes'].first
        value['selected'] = true
      elsif field['codification_kind'] == 'revision_number'
        field['value'] = '1'
      elsif field['kind'] == 'text_field' || field['kind'] == 'textarea_field'
        field['value'] = Faker::Name.initials(3)
      elsif field['kind'] == 'date_field'
        field['value'] = Time.now.to_s
      elsif field['kind'] == 'upload_field'
        field['files'] = [fixture_file_upload('spec/fixtures/test.txt')]
      end
    end
    doc_attrs['document_revision_id'] = rev.id
    doc_attrs
  end
end
