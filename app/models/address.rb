class Address < ApplicationRecord
  validates_inclusion_of :country,
      in: ISO3166::Country.codes,
      allow_blank: true
end
