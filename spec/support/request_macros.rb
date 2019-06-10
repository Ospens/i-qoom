module RequestMacros
  def credentials(user)
    session = Session.new(login: user.email, password: user.password)
    { 'Authorization' => session.auth_token }
  end
end