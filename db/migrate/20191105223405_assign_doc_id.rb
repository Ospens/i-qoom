# one time use migration
class AssignDocId < ActiveRecord::Migration[5.2]
  def up
    Document.all.find_each do |document|
      document.send(:assign_doc_id)
      document.save(validate: false)
    end
  end
end
