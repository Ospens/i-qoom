class DmsTeam < ApplicationRecord
  belongs_to :project

  has_many :document_rights,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  accepts_nested_attributes_for :document_rights

  has_and_belongs_to_many :users
end
