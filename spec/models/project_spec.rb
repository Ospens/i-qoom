require 'rails_helper'

RSpec.describe Project, type: :model do
  context "creation_step" do
    subject { FactoryBot.build(:project) }
    it { is_expected.to define_enum_for(:creation_step)
            .with_values([ :admins,
                           :name,
                           :company_data,
                           :billing_address,
                           :done ])
            .with_prefix(:creation_step) }
  end

  context "creation step is admins" do
    subject { FactoryBot.build(:project_admins_step) }
    it { is_expected.not_to validate_presence_of(:name) }
    it { is_expected.not_to validate_length_of(:name).is_at_least(3).is_at_most(255) }
  end

  context "created on admins creation step" do
    subject { FactoryBot.create(:project_admins_step) }
    it "should add a project creator as an admin" do
      expect(subject.admins.find_by(email: subject.user.email)).to be_present
      expect(subject.admins.find_by(email: subject.user.email).status).to eq("active")
    end
  end

  context "creation step is not admins" do
    subject { FactoryBot.build(:project_admins_step,
                               creation_step: [ :name,
                                                :company_data,
                                                :billing_address,
                                                :done ].sample) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_least(3)
                                                 .is_at_most(255) }
  end

  context "creation_step is company_data" do
    subject { FactoryBot.build(:project_company_data_step) }
    it { is_expected.to validate_presence_of(:company_data) }
  end

  context "properly created project" do
    subject { FactoryBot.create(:project) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to validate_presence_of(:admins) }
  end
  it { is_expected.to have_many(:admins).class_name('ProjectAdministrator') }
  it { is_expected.to accept_nested_attributes_for(:admins) }
  it { is_expected.to accept_nested_attributes_for(:company_data)
                        .update_only(true) }
  it { is_expected.to have_many(:disciplines) }

  context "update_creation_step_to_done" do
    context "when is not ready" do
      subject { FactoryBot.create(:project_company_data_step,
                company_data: FactoryBot.build(:project_company_data_without_billing_address)) }
      it { expect(subject.creation_step).not_to eq("done") }
    end
    context "when is ready" do
      subject { FactoryBot.create(:project_company_data_step) }

      it { expect(subject.creation_step).to eq("done") }
      it { expect(subject.admins
                         .find_by(email: subject.user.email)
                         .first_confirmation_sent_at).to be_nil }
    end
  end

  context "invite_members" do
    let(:project) { FactoryBot.create(:project) }
    it "expect to be true when there are members" do
      member_ids =
        FactoryBot.create_list(:project_member_pending,
                               2,
                               project: project).map(&:id)
      expect(project.invite_members(member_ids, project.user.id)).to be_truthy
      expect(project.members.first.inviter_id).to eq(project.user.id)
    end
    it "expect to be true when there're no members" do
      expect(project.invite_members([], project.user.id)).to be_falsy
    end
  end

  context 'validate project_code' do
    let(:project) { FactoryBot.build(:project) }

    it 'valid' do
      project.project_code = 'AAA'
      expect(project).to be_valid
      project.project_code = nil
      expect(project).to be_valid
    end

    it 'length' do
      project.project_code = 'AA'
      expect(project).to_not be_valid
      project.project_code = 'AAAA'
      expect(project).to_not be_valid
    end

    it 'upcase' do
      project.project_code = 'aaa'
      expect(project).to_not be_valid
    end

    it 'blank' do
      project.project_code = ''
      expect(project).to_not be_valid
    end

    it 'not allow to set nil if already not blank' do
      project.project_code = 'AAA'
      project.save!
      project.project_code = nil
      expect(project).to_not be_valid
    end
  end
end
