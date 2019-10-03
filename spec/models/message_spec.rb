require 'rails_helper'

RSpec.describe Message, type: :model do
  it { is_expected.to validate_length_of(:subject)
                        .is_at_least(2)
                        .is_at_most(255) }
  it { is_expected.to validate_presence_of(:subject) }
  it { is_expected.to validate_presence_of(:body) }
  it { is_expected.to belong_to(:sender)
                        .class_name("User") }
  it { is_expected.to belong_to(:recipient)
                        .class_name("User") }

  it { is_expected.to define_enum_for(:recipient_status)
                        .with_values([ :unread,
                                       :read,
                                       :deleted ])
                        .with_prefix(:recipient_status) }

  it { is_expected.to define_enum_for(:sender_status)
                        .with_values([ :sent,
                                       :deleted ])
                        .with_prefix(:sender_status) }
end
