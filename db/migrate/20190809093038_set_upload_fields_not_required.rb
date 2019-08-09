# one-time-use migration
class SetUploadFieldsNotRequired < ActiveRecord::Migration[5.2]
  def up
    DocumentField.where(kind: :upload_field).update_all(required: false)
  end
end
