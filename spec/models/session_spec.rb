require 'rails_helper'

describe Session, type: :model do

  context "is expected to be successfull" do
    user = FactoryBot.create(:user)
    it "with email" do
      session = Session.new(login: user.email, password: "password1")
      expect(session.auth_token).to be_truthy
    end
    it "with username" do
      session = Session.new(login: user.username, password: "password1")
      expect(session.auth_token).to be_truthy
    end
  end

  context "is expected not to be successfull" do
    user = FactoryBot.create(:user)
    context "without" do 
      it "login" do
        session = Session.new(password: "password1")
        expect(session.auth_token).to be_falsy
      end
      it "password" do
        session = Session.new(login: [ user.username,
                                       user.email ].sample)
        expect(session.auth_token).to be_falsy
      end
    end
    context "with a wrong" do
      it "login" do
        session =
          Session.new(login: [ Faker::Internet.email,
                               Faker::Internet.unique.user_name ].sample,
                      password: "password1")
        expect(session.auth_token).to be_falsy
      end
      it "password" do
        session =
          Session.new(login: [ user.username,
                               user.email ].sample,
                      password: "password2")
        expect(session.auth_token).to be_falsy
      end
    end
  end

end