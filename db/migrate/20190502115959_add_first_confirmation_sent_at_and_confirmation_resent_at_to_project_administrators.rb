class AddFirstConfirmationSentAtAndConfirmationResentAtToProjectAdministrators < ActiveRecord::Migration[5.2]
  def change
    add_column :project_administrators, :first_confirmation_sent_at, :datetime
    add_column :project_administrators, :confirmation_resent_at, :datetime
  end
end
