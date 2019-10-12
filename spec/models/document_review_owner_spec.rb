require 'rails_helper'

RSpec.describe DocumentReviewOwner, type: :model do
  subject { FactoryBot.build(:document_review_owner) }

  it { should validate_uniqueness_of(:user_id).scoped_to(:project_id) }
end
