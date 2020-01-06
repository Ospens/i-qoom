require 'rails_helper'

describe DocumentNativeFileDownload, type: :request do
  let(:json) { JSON(response.body) }
  let(:doc) { FactoryBot.create(:document) }
  let(:slug) { Faker::Internet.password }
  let(:pass) { Faker::Internet.password }
  let(:pass2) { Faker::Internet.password }

  before do
    download = doc.document_native_file_downloads.new(slug: slug)
    download.password = pass
    download.save!
  end

  it 'valid password' do
    post "/api/v1/document_native_file_downloads/#{slug}/download",
      params: { password: pass }
    expect(response).to have_http_status(:success)
    expect(response.body).to eql("111\n")
  end

  it 'invalid password' do
    expect(pass).to_not eql(pass2)
    post "/api/v1/document_native_file_downloads/#{slug}/download",
      params: { password: pass2 }
    expect(response).to have_http_status(:forbidden)
  end
end
