class AddProjectToConventions < ActiveRecord::Migration[5.2]
  def change
    add_reference :conventions, :project, foreign_key: true
  end
end
