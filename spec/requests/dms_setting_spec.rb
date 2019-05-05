require 'rails_helper'

describe DmsSetting, type: :request do
  let(:json) { JSON(response.body) }
  let(:project) { FactoryBot.create(:project) }

  def credentials(user)
    session = Session.new(login: user.email, password: user.password)
    { 'Authorization' => session.auth_token }
  end

  it '#edit' do
    get "/api/v1/projects/#{project.id}/dms_settings/edit", headers: credentials(project.user)
    expect(response).to have_http_status(:success)
    expect(json[0]['name']).to eql('show_all_revisions')
    expect(json[0]['value']).to be_nil
    project.dms_settings.create!(name: 'show_all_revisions', value: 'true', user: project.user)
    get "/api/v1/projects/#{project.id}/dms_settings/edit", headers: credentials(project.user)
    expect(JSON(response.body)[0]['name']).to eql('show_all_revisions')
    expect(JSON(response.body)[0]['value']).to eql('true')
  end

  it '#update' do
    setting =
      FactoryBot.create(:dms_setting,
                        name: 'show_all_revisions',
                        value: 'false',
                        project: project,
                        user: project.user)
    project_params = {
      project: {
        dms_settings_attributes: [{ id: setting.id, name: setting.name, value: 'true' }]
      }
    }
    patch "/api/v1/projects/#{project.id}/dms_settings", params: project_params, headers: credentials(project.user)
    expect(response).to have_http_status(:success)
    expect(setting.reload.value).to eql('true')
    project_params = {
      project: {
        dms_settings_attributes: [{ id: setting.id, name: setting.name, value: 'false' }]
      }
    }
    patch "/api/v1/projects/#{project.id}/dms_settings", params: project_params, headers: credentials(FactoryBot.create(:user))
    expect(response).to have_http_status(422)
    expect(setting.reload.value).to eql('true')
  end
end
