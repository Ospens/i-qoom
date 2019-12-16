class DmsPlannedList < ApplicationRecord
  belongs_to :project
  has_and_belongs_to_many :users
  has_and_belongs_to_many :document_mains
end
