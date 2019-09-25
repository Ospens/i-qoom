require 'rails_helper'

describe RegistrationConfirmation, type: :model do
  let(:user) { FactoryBot.create(:user, confirmed_at: nil) }

  context "should confirm a user" do
    it "in a regular case" do
      registration_confirmation =
        RegistrationConfirmation.new(token: user.confirmation_token)
      registration_confirmation.save
      expect(User.find_by(id: user.id).confirmed?).to be_truthy
    end
  end

  context "shouldn't confirm a user" do
    it "without a token" do
      registration_confirmation = 
        RegistrationConfirmation.new(token: nil)
      registration_confirmation.save
      expect(User.find_by(id: user.id).confirmed?).to be_falsy
    end
    it "with an invalid token" do
      registration_confirmation = 
        RegistrationConfirmation.new(token: "fsff98fgh897g087g0fhgasf")
      registration_confirmation.save
      expect(User.find_by(id: user.id).confirmed?).to be_falsy
    end

    it "with a wrong id" do
      token = ::JsonWebToken.encode(user_id: rand(999),
                                    email: user.email)
      registration_confirmation =
        RegistrationConfirmation.new(token: token)
      registration_confirmation.save
      expect(User.find_by(id: user.id).confirmed?).to be_falsy
    end

    it "if already confirmed" do
      user = FactoryBot.create(:user, confirmed_at: Time.now)
      registration_confirmation =
        RegistrationConfirmation.new(token: user.confirmation_token)
      expect(registration_confirmation.save).to be_falsy
    end
  end
end
