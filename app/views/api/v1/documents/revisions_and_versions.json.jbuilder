json.array! @main.revisions do |revision|
  json.revision_number revision.revision_number
  json.versions revision.versions.order_by_revision_version do |document|
    json.id document.id
    json.revision_version document.revision_version
  end
end
