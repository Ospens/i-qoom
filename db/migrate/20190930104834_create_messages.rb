class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string   :subject
      t.text     :body
      t.integer  :recipient_id
      t.integer  :sender_id
      t.datetime :read_at
      t.integer  :recipient_status
      t.integer  :sender_status
      t.datetime :sent_at
      t.timestamps
    end
  end
end
