class Api::V1::DocumentNativeFileDownloadsController < ApplicationController
  before_action :set_download
  skip_authorization_check

  def show
  end

  def download
    if @download.authenticate(params[:password])
      document = @download.document
      file = document.native_file
      filename =
        "#{document.codification_string}#{file.filename.extension_with_delimiter}"
      send_data(file.download, filename: filename, disposition: 'attachment')
    else
      head 403
    end
  end

  private

  def set_download
    @download = DocumentNativeFileDownload.find_by!(slug: params[:id])
  end
end
