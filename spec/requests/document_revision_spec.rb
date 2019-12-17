require 'rails_helper'

describe DocumentRevision, type: :request do
  context 'update_review_status' do
    it 'anon' do
      doc = FactoryBot.create(:document)
      post "/api/v1/document_revisions/#{doc.revision.id}/update_review_status",
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      doc = FactoryBot.create(:document)
      user = FactoryBot.create(:user)
      post "/api/v1/document_revisions/#{doc.revision.id}/update_review_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'review owner' do
      doc = FactoryBot.create(:document)
      rev = doc.revision
      main = rev.document_main
      expect(main).to be_issued_for_information
      user = FactoryBot.create(:user)
      expect_any_instance_of(DocumentRevision).to receive(:can_update_review_status?).with(user).and_return(true)
      post "/api/v1/document_revisions/#{rev.id}/update_review_status",
        headers: credentials(user),
        params: { status: 'accepted' }
      expect(response).to have_http_status(:success)
      expect(main.reload).to be_accepted
    end
  end

  context '#review_menu' do
    let(:json) { JSON(response.body) }
    let(:document) { FactoryBot.create(:document) }
    let(:user) { FactoryBot.create(:user) }
    let(:project) { document.project }
    let(:user2) { FactoryBot.create(:user) }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_revisions/review_menu"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_revisions/review_menu",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'reviewer' do
      document.revision.document_review_subjects.create!(user: user, reviewers: [user], review_issuer: user2)
      project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
      get "/api/v1/projects/#{project.id}/document_revisions/review_menu",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['all_review']['statuses']['issued_for_information']['count']).to eql(1)
      expect(json['my_review']['statuses']['issued_for_information']['count']).to eql(0)
    end

    it 'issuer' do
      review_subject =
        document.revision
                .document_review_subjects
                .create!(user: user, reviewers: [user2], review_issuer: user)
      review_subject.comments.create!(text: '111', user: user)
      project.members.create!(user: user,
                              dms_module_access: true,
                              employment_type: :employee)
      get "/api/v1/projects/#{project.id}/document_revisions/review_menu",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['all_review']['statuses']['issued_for_information']['count']).to eql(1)
      expect(json['my_review']['statuses']['issued_for_information']['count']).to eql(0)
      expect(json['all_review']['unread_comments']).to eql(1)
    end

    it 'owner' do
      originating_company =
        document.document_fields
           .find_by(codification_kind: :originating_company)
           .document_field_values.find_by(selected: true).value
      review_subject =
        document.revision
                .document_review_subjects
                .create!(user: user, reviewers: [user2], review_issuer: user)
      review_subject.comments.create!(text: '111', user: user)
      project.members.create!(email: user.email,
                              dms_module_access: true,
                              employment_type: :employee)
      project.members.create!(user: user, dms_module_access: true, employment_type: :employee)
      DocumentReviewOwner.create!(user: user, project: project, originating_company: originating_company)
      get "/api/v1/projects/#{project.id}/document_revisions/review_menu",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json['all_review']['statuses']['issued_for_information']['count']).to eql(1)
      expect(json['my_review']['statuses']['issued_for_information']['count']).to eql(1)
      expect(json['my_review']['unread_comments']).to eql(1)
    end
  end

  context '#review_index' do
    let(:json) { JSON(response.body) }
    let(:document) { FactoryBot.create(:document) }
    let(:user) { FactoryBot.create(:user) }
    let(:project) { document.project }
    let(:revision) { document.revision }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_revisions/review_index"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_revisions/review_index",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    context 'access' do
      before do
        project.members.create!(user: user,
                                dms_module_access: true,
                                employment_type: :employee)
      end

      it 'no scope' do
        revision.document_review_subjects.create!(user: user,
                                                  reviewers: [user],
                                                  review_issuer: user)
        get "/api/v1/projects/#{project.id}/document_revisions/review_index",
          headers: credentials(user)
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(0)
      end

      it 'my review' do
        originating_company =
          document.document_fields
             .find_by(codification_kind: :originating_company)
             .document_field_values.find_by(selected: true).value
        DocumentReviewOwner.create!(user: user,
                                    project: project,
                                    originating_company: originating_company)
        get "/api/v1/projects/#{project.id}/document_revisions/review_index",
          headers: credentials(user),
          params: { scope: 'my_review' }
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(1)
        expect(json.first['id']).to eql(revision.id)
      end

      it 'all review' do
        review_subject =
          revision.document_review_subjects.create!(user: user,
                                                    reviewers: [user],
                                                    review_issuer: user)
        review_subject.comments.create!(text: '111', user: user)
        get "/api/v1/projects/#{project.id}/document_revisions/review_index",
          headers: credentials(user),
          params: { scope: 'all_review' }
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(1)
        expect(json.first['id']).to eql(revision.id)
        expect(json.first['unread_comments_count']).to eql(1)
      end

      it 'review status wrong' do
        revision.document_review_subjects.create!(user: user,
                                                  reviewers: [user],
                                                  review_issuer: user)
        get "/api/v1/projects/#{project.id}/document_revisions/review_index",
          headers: credentials(user),
          params: { scope: 'all_review', review_status: 'accepted' }
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(0)
      end

      it 'review status right' do
        revision.document_review_subjects.create!(user: user,
                                                  reviewers: [user],
                                                  review_issuer: user)
        get "/api/v1/projects/#{project.id}/document_revisions/review_index",
          headers: credentials(user),
          params: { scope: 'all_review', review_status: 'issued_for_information' }
        expect(response).to have_http_status(:success)
        expect(json.length).to eql(1)
        expect(json.first['id']).to eql(revision.id)
      end
    end
  end

  context '#review_index' do
    let(:json) { JSON(response.body) }
    let(:document) { FactoryBot.create(:document) }
    let(:user) { FactoryBot.create(:user) }
    let(:project) { document.project }
    let(:revision) { document.revision }

    it 'anon' do
      get "/api/v1/projects/#{project.id}/document_revisions/#{revision.id}/review_show"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      get "/api/v1/projects/#{project.id}/document_revisions/#{revision.id}/review_show",
        headers: credentials(user)
      expect(response).to have_http_status(:forbidden)
    end

    it 'user with rights' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/projects/#{project.id}/document_revisions/#{revision.id}/review_show",
        headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('id')
      expect(json).to have_key('document_id')
      expect(json).to have_key('codification_string')
      expect(json).to have_key('document_review_subjects')
      expect(json).to have_key('review_owners')
      expect(json).to have_key('review_status')
      expect(json).to have_key('title')
      expect(json).to have_key('unread_comments_count')
    end
  end
end
