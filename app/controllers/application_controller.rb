class ApplicationController < ActionController::Base
  before_action :parse_json_in_params

  skip_before_action :verify_authenticity_token

  protected

  def valid_json?(json)
    JSON json
    true
  rescue JSON::ParserError => e
    false
  end

  private

  def parse_json_in_params
    puts params # for debugging
    params.each do |k, v|
      if valid_json?(v)
        params[k] = JSON v
      end
    end
    puts params # for debugging
  end

end
