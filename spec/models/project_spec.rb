require 'rails_helper'

RSpec.describe Project, type: :model do

  context "creation_step" do
    subject { FactoryBot.build(:project) }
    it { is_expected.to define_enum_for(:creation_step)
            .with_values([:admins, :name, :company_datum, :done])
            .with_prefix(:creation_step) }
  end
  
  context "creation step is admins" do
    subject { FactoryBot.build(:project,
                               creation_step: :admins) }
    it { is_expected.not_to validate_presence_of(:name) }
    it { is_expected.not_to validate_length_of(:name).is_at_least(3).is_at_most(255) }
  end

  context "creation step is not admins" do
    subject { FactoryBot.build(:project,
                               creation_step: [:name, :company_datum, :done].sample) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_least(3)
                                                 .is_at_most(255) }
  end

  context "creation_step is company_datum" do
    subject { FactoryBot.build(:project, creation_step: :company_datum) }
    it { is_expected.to validate_presence_of(:company_datum) }
  end

  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:admins).class_name('ProjectAdministrator') }
  it { is_expected.to accept_nested_attributes_for(:admins) }
  it { is_expected.to validate_presence_of(:admins) }

end
