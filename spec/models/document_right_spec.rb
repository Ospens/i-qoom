require 'rails_helper'

RSpec.describe DocumentRight, type: :model do
  subject { FactoryBot.build(:document_right) }

  it { should be_valid }

  context '#limit_for_based_on_field_kind' do
    it 'codification_field' do
      subject.document_field.kind = :select_field
      subject.document_field.codification_kind = :originating_company
      expect(subject).to_not be_valid
      subject.document_field_value = FactoryBot.build(:document_field_value)
      expect(subject).to_not be_valid
      subject.limit_for = :value
      expect(subject).to be_valid
    end

    it 'non codification_field' do
      expect(subject).to be_limit_for_field
      expect(subject.document_field.codification_kind).to be_nil
      subject.user = nil
      expect(subject).to_not be_valid
    end
  end

  it do
    subject.save
    expect(subject.convention).to be_present
  end

  it do
    subject.save
    expect(subject.project).to be_present
  end

  it 'expect to filter by project' do
    subject.save
    convention = subject.convention
    project = convention.project
    doc_right = FactoryBot.create(:document_right, convention: convention, user: subject.user)
    FactoryBot.create(:document_right, user: subject.user)
    rights = subject.user.document_rights
    expect(subject.convention).to eql(doc_right.convention)
    expect(rights.count).to eql(3)
    # bug https://github.com/rails/rails/issues/33991
    expect(rights.joins(:project).where(projects: { id: project.id }).count).to eql(2)
  end

  it '#attributes_for_edit' do
    convention = FactoryBot.create(:convention)
    project = convention.project
    user = FactoryBot.create(:user)
    expect(Document.new(project: project).can_create?(user)).to eql(false)
    originating_company =
      convention.document_fields.find_by(codification_kind: :originating_company)
    originating_company.document_rights.create(user: user,
                                               limit_for: :value,
                                               document_field_value:
                                                originating_company.document_field_values.first,
                                               enabled: true)
    attrs = DocumentRight.attributes_for_edit(project)
    expect(attrs[:users].length).to eql(1)
    expect(attrs[:users].first[:id]).to eql(user.id)
    attrs[:users].first[:document_rights_attributes].each do |right|
      right['enabled'] = true
    end
    attrs[:users].each do |user_params|
      User.find(user_params[:id]).update!(user_params.except(:id).merge(accept_terms_and_conditions: true))
    end
    expect(Document.new(project: project).can_create?(user)).to eql(true)
    user2 = FactoryBot.create(:user)
    attrs = DocumentRight.attributes_for_edit(project, true)
    expect(attrs[:users].map{ |i| i[:id] }).to\
      match_array([user2.id, project.user.id])
  end
end
