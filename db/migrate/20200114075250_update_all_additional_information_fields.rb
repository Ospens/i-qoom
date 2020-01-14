class UpdateAllAdditionalInformationFields < ActiveRecord::Migration[5.2]
  def up
    DocumentField.where(codification_kind: :additional_information).update_all(required: false)
  end
end
