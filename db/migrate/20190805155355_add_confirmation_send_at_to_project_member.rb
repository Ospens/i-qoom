class AddConfirmationSendAtToProjectMember < ActiveRecord::Migration[5.2]
  def change
    add_column :project_members, :confirmation_sent_at, :datetime
  end
end
