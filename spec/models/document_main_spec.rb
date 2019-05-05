require 'rails_helper'

RSpec.describe DocumentMain, type: :model do
  it 'has revisions' do
    main = FactoryBot.create(:document_main)
    rev = FactoryBot.create(:document_revision, document_main: main)
    expect(main.revisions).to eq([rev])
    expect(rev.document_main).to eq(main)
  end
end
