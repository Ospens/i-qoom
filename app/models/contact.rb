class Contact
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  @@accessible_columns = [:email, :phone_number, :text]

  attr_accessor *@@accessible_columns

  validates_presence_of *@@accessible_columns
  
  validates :email, email: true

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end

end