module PdfRender
  def document_render(document)
    PDFKit.configure do |config|
      config.default_options = {
        encoding:       'UTF-8',
        page_height:    '297mm',
        page_width:     '212mm',
        margin_top:     '2.54cm',
        margin_right:   '2.54cm',
        margin_bottom:  '2.54cm',
        margin_left:    '2.54cm',
        quiet: true
      }
    end

    kit =
      PDFKit.new(render_to_string(partial: 'api/v1/documents/pdf/document',
                                  layout: false,
                                  locals: { document: document }))

    # inline_css = Sass.compile(File.read(Rails.root.join('app',
    #                                                     'assets',
    #                                                     'stylesheets',
    #                                                     'pdf',
    #                                                     'document.css.scss')))
    # document_css = Tempfile.new(['document_css', '.css'])
    # document_css.write(inline_css)
    # document_css.close

    # kit.stylesheets << document_css.path
    pdf_inline = kit.to_pdf
    # document_css.unlink
    pdf_inline
  end

  def document_list_render(documents)
    PDFKit.configure do |config|
      config.default_options = {
        encoding:       'UTF-8',
        page_height:    '297mm',
        page_width:     '212mm',
        margin_top:     '2.54cm',
        margin_right:   '2.54cm',
        margin_bottom:  '2.54cm',
        margin_left:    '2.54cm',
        quiet: true
      }
    end

    kit =
      PDFKit.new(render_to_string(partial: 'api/v1/documents/pdf/document_list',
                                  layout: false,
                                  formats: [:html],
                                  locals: { documents: documents }))

    # inline_css = Sass.compile(File.read(Rails.root.join('app',
    #                                                     'assets',
    #                                                     'stylesheets',
    #                                                     'pdf',
    #                                                     'document.css.scss')))
    # document_css = Tempfile.new(['document_css', '.css'])
    # document_css.write(inline_css)
    # document_css.close

    # kit.stylesheets << document_css.path
    pdf_inline = kit.to_pdf
    # document_css.unlink
    pdf_inline
  end
end
