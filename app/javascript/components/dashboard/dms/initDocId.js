const checkInitOptions = (options, value) => (
  options.map(option => {
    const selected = option.value === value
    return {
      ...option,
      selected
    }
  })
)

const idField = (field, value) => {
  if (field.document_field_values.findIndex(el => el.value === value) < 0) {
    return {
      ...field,
      value: ''
    }
  }

  return {
    ...field,
    value,
    document_field_values: checkInitOptions(field.document_field_values, value)
  }
}

export const fileNameReg = /^([A-Za-z\-0-9]{3,5})([-_\s])([A-Za-z\-0-9]{3,5})([-_\s])([A-Za-z\-0-9]{3,5})([-_\s])([A-Za-z\-0-9]{3,5})([-_\s])([0-9]{1,5})([-_\s])([0-9]+)([-_\s])(.+?(?=\.))/i

export function initValues(fields, notify) {
  if (!fields) return undefined

  const { file } = fields.find(el => el.codification_kind === 'document_native_file')
  if (!file || !file[0]) return undefined

  const documentName = file[0].name
  const docNameInfo = documentName.match(fileNameReg)
  if (!docNameInfo) {
    notify(file[0].name)
    return undefined
  }
  docNameInfo.shift()

  let idsFields = fields.filter(field => [
    'originating_company',
    'discipline',
    'document_type',
    'document_number',
    'revision_number',
    'document_native_file'
  ].includes(field.codification_kind))
  const info = []

  idsFields = idsFields.map(field => {
    if (field.codification_kind === 'originating_company') {
      const newField = idField(field, docNameInfo[2])
      if (newField.value.length < 1) {
        info.push({
          message: `Option ${docNameInfo[2]} is not includes in ${newField.title} list`
        })
      }
      return newField
    } if (field.codification_kind === 'discipline') {
      const newField = idField(field, docNameInfo[4])
      if (newField.value.length < 1) {
        info.push({
          message: `Option ${docNameInfo[4]} is not includes in ${newField.title} list`
        })
      }
      return newField
    } if (field.codification_kind === 'document_type') {
      const newField = idField(field, docNameInfo[6])
      if (newField.value.length < 1) {
        info.push({
          message: `Option ${docNameInfo[6]} is not includes in ${newField.title} list`
        })
      }
      return newField
    } if (field.codification_kind === 'document_number') {
      return {
        ...field,
        value: docNameInfo[8]
      }
    } if (field.codification_kind === 'revision_number') {
      return {
        ...field,
        value: docNameInfo[10]
      }
    }
    return {
      ...field,
      value: docNameInfo,
      file: [file[0]]
    }
  })

  let projectСode = docNameInfo[0]
  if (projectСode !== 'MWP') {
    projectСode = 'MWP'
    info.push({
      message: 'Wrong project code: changed to MWP'
    })
  }

  const newValues = {
    fields: idsFields,
    title: docNameInfo[12],
    project_code: projectСode,
    info
  }
  return newValues
}
