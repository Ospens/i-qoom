require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module IQoom
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
    config.eager_load_paths << Rails.root.join('lib')
    config.generators do |g|
      g.template_engine  false
      g.jbuilder         false
      g.javascripts      false
      g.helper           false
      g.test_framework   :rspec
      g.helper_specs     false
      g.view_specs       false
      g.controller_specs false
      g.integration_tool false
    end
  end
end
