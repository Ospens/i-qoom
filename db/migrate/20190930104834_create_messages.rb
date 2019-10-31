class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string   :subject
      t.text     :body
      t.integer  :sender_id
      t.integer  :status, default: 0
      t.datetime :sent_at
      t.timestamps
    end
  end
end
