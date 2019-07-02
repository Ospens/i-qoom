xml.instruct!
xml.documents do
  @documents.each do |ar|
    xml.document do
      Document.visible_columns.each do |column|
        key =
          t("documents.list.#{column}")
            .underscore
            .gsub(/\./, '')
            .gsub(/\s/, '_')
        xml.tag!(key, ar.send(column))
      end
    end
  end
end
