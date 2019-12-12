module DocumentConcern
  def common_document_params(attrs, assign_attrs = false, user)
    # assign_attrs is used to ensure that document_params is called from action
    # instead of cancancan gem
    if assign_attrs
      attrs[:document_fields_attributes] = attrs.delete(:document_fields)
      attrs[:document_fields_attributes].each do |field|
        next if field[:document_field_values].blank?
        field[:document_field_values_attributes] = field.delete(:document_field_values)
      end
    end
    attrs.permit(:issued_for,
                 :title,
                 :review_status,
                 :email_title,
                 :email_title_like_document,
                 :email_text,
                 :contractor,
                 :unplan_document,
                 emails: [],
                 reviewers: [],
                 review_issuers: [],
                 document_fields_attributes:
                  [ :kind,
                    :codification_kind,
                    :column,
                    :row,
                    :required,
                    :multiselect,
                    :title,
                    :command,
                    :value,
                    :file,
                    document_field_values_attributes: [
                      :value,
                      :title,
                      :selected,
                      :position
                    ]
                  ]).merge(user: user)
  end
end
