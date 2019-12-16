require 'rails_helper'

RSpec.describe Project, type: :model do
  context "creation_step" do
    subject { FactoryBot.build(:project) }
    it { is_expected.to define_enum_for(:creation_step)
            .with_values([ :name,
                           :company_data,
                           :billing_address,
                           :done ])
            .with_prefix(:creation_step) }
  end

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(3).is_at_most(255) }

  context "created" do
    subject { FactoryBot.create(:project_name_step) }
    it "should add a project creator as an admin and member" do
      expect(subject.admins.first).to eq(subject.members.first)
      expect(subject.admins.count).to eq 1
      expect(subject.members.count).to eq 1
      expect(subject.members.first.creation_step_active?).to be_truthy
    end
    it "should have default roles and disciplines" do
      expect(subject.roles.map(&:title)).to\
        include(*[ "Project Administrator",
                   "Project Lead",
                   "Project Manager",
                   "Package Manager",
                   "Engineering Manager",
                   "Electrical Engineer",
                   "Mechanical Engineer",
                   "Civil Engineer",
                   "Process Manager",
                   "Interface Manager",
                   "Commercial Manager",
                   "Contract Manager",
                   "Logistics Manager",
                   "Legal Advisor",
                   "Scheduler",
                   "IT Expert",
                   "Admin Support",
                   "HR Manager",
                   "Secretary",
                   "Development Manager",
                   "Finance Manager",
                   "Controller",
                   "Document Manager",
                   "Procurement Manager",
                   "Procurement Lead",
                   "Accountant" ])
      expect(subject.disciplines.map(&:title)).to\
        include(*[ "i-Qoom Admin",
                   "Management",
                   "Document Management",
                   "Human Ressources",
                   "Electrical",
                   "Mechanical",
                   "Civil",
                   "Logistics",
                   "Construction",
                   "Cross Discipline",
                   "Infrastructure",
                   "Finance",
                   "Commercial" ])
    end
  end

  context "creation_step is company_data" do
    subject { FactoryBot.build(:project_company_data_step) }
    it { is_expected.to validate_presence_of(:company_data) }
  end

  context "properly created project" do
    subject { FactoryBot.create(:project) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to validate_presence_of(:admins).on(:update) }
  end
  it { is_expected.to accept_nested_attributes_for(:company_data)
                        .update_only(true) }

  it { is_expected.to have_many(:admins)
                        .class_name('ProjectMember')}
    # not working and syntax for testing conditions for nested records with joins is not clear
    #                     .conditions(roles: { title: "Project Administrator" })
  it { is_expected.to have_many(:disciplines) }

  context "update_creation_step_to_done" do
    context "when is not ready" do
      subject { FactoryBot.create(:project_company_data_step,
                company_data: FactoryBot.build(:project_company_data_without_billing_address)) }
      it { expect(subject.creation_step).not_to eq("done") }
    end
    context "when is ready" do
      subject { FactoryBot.create(:project_company_data_step) }

      it do
        subject.update(name: "test")
        expect(subject.creation_step).to eq("done")
      end
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
      expect(project.members.last.inviter_id).to eq(project.user.id)
    end
    it "expect to be true when there're no members" do
      expect(project.invite_members([], project.user.id)).to be_falsy
    end
  end

  context 'validate project_code' do
    let(:project) { FactoryBot.create(:project) }
    before(:each) { project.reload }
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
