require 'rails_helper'

describe DocumentReviewComment, type: :request do
  let(:json) { JSON(response.body) }
  let(:revision) { FactoryBot.create(:document_revision) }
  let!(:document) do
    doc = FactoryBot.create(:document)
    doc.update!(revision: revision)
    doc
  end
  let(:document_review_subject) { FactoryBot.create(:document_review_subject, document_revision: revision) }
  let(:user) { FactoryBot.create(:user) }

  context '#new' do
    it 'anon' do
      get "/api/v1/document_review_subjects/#{document_review_subject.id}/document_review_comments/new"
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      get "/api/v1/document_review_subjects/#{document_review_subject.id}/document_review_comments/new", headers: credentials(user)
      expect(response).to have_http_status(:success)
      expect(json).to have_key('id')
      expect(json).to have_key('text')
      expect(json).to have_key('created_at')
    end
  end

  context '#create' do
    it 'anon' do
      post "/api/v1/document_review_subjects/#{document_review_subject.id}/document_review_comments",\
        params: { document_review_comment: { text: '111' } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      expect_any_instance_of(Document).to receive(:can_view?).with(user).and_return(true)
      post "/api/v1/document_review_subjects/#{document_review_subject.id}/document_review_comments",\
        headers: credentials(user),\
        params: { document_review_comment: { text: '111' } }
      expect(response).to have_http_status(:success)
      expect(json['text']).to eql('111')
      expect(document_review_subject.comments.count).to eql(1)
      expect(document_review_subject.comments.last.text).to eql('111')
    end
  end

  context '#update' do
    let(:comment) do
      comment = FactoryBot.build(:document_review_comment)
      comment.document_review_subject = document_review_subject
      comment.user = user
      comment.save! and return comment
    end
    let(:comment_params) do
      { document_review_comment: {
        text: '111',
        file: fixture_file_upload('test.txt')
      } }
    end

    it 'anon' do
      patch "/api/v1/document_review_comments/#{comment.id}",\
        params: comment_params
      expect(response).to have_http_status(:forbidden)
    end

    it 'user' do
      patch "/api/v1/document_review_comments/#{comment.id}",\
        headers: credentials(user),\
        params: comment_params
      expect(response).to have_http_status(:success)
      expect(json['text']).to_not eql('111')
      expect(comment.file).to be_attached
      expect(comment.file.download.strip).to eql('111')
    end
  end
end
