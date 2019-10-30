require 'rails_helper'

RSpec.describe MessageRecipient, type: :model do
  it { is_expected.to define_enum_for(:status)
                        .with_values([ :unread,
                                       :read,
                                       :deleted ]) }
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:message) }
end
