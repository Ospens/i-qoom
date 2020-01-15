export default function formvalue(fields = [], codKind) {
  if (fields.length < 1) return ''

  const field = fields.filter(values => values.codification_kind === codKind)[0]
  if (!field) return ''

  if (codKind === 'document_native_file') return field.file

  return field.value
}
