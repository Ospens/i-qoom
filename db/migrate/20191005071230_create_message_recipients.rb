class CreateMessageRecipients < ActiveRecord::Migration[5.2]
  def change
    create_table :message_recipients do |t|
      t.integer  :user_id
      t.integer  :message_id
      t.integer  :status, default: 0
      t.datetime :read_at
    end
  end
end
