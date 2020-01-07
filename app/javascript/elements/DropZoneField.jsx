import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'
import { fileNameReg } from '../components/dashboard/dms/initDocId'

const fileProperties = [
  'lastModified',
  'lastModifiedDate',
  'name',
  'path',
  'preview',
  'size',
  'type',
  'webkitRelativePath'
]

export const fileToObject = fileBlob => {
  const newFile = {}
  fileProperties.forEach(key => {
    newFile[key] = fileBlob[key]
  })
  return newFile
}

function DropZoneField({
  input, filename, label, disabled = false, renameFile = false, meta: { touched, error }
}) {
  const onDrop = useCallback(acceptedFiles => {
    if (renameFile) {
      const docNameInfo = filename.match(fileNameReg)
      const newFileWrong = acceptedFiles[0].name.match(fileNameReg)

      if (docNameInfo && !newFileWrong) {
        docNameInfo[11] = (Number(docNameInfo[11]) + 1).toString().padStart(2, 0)
        docNameInfo[13] = acceptedFiles[0].name
        const value = docNameInfo.filter((_, i) => i < 14 && i > 0).join('')
        Object.defineProperty(acceptedFiles[0], 'name', { writable: true, value })
      }
    }
    input.onChange(acceptedFiles)
  }, [filename, input, renameFile])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    rejectedFiles,
    acceptedFiles
  } = useDropzone({
    disabled,
    onDrop,
    minSize: 0
  })

  const isFileRejected = rejectedFiles.length !== 0
  const sectionClass = classnames({ 'is-invalid': touched && error })
  const currentFile = input.value ? input.value[0] : acceptedFiles[0]
  const fileChanged = input.value ? input.value[0].name !== currentFile : false
  /*
  useEffect(() => {
    if (!input.value) return
    console.log(input.value[0].name, currentFile)

  }, [input.value, currentFile]) */
  const mainClass = classnames(
    'drop-zone-area',
    {
      'with-file': acceptedFiles[0],
      disabled
    }
  )

  return (
    <section className={sectionClass}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div {...getRootProps()} className={mainClass}>
        {fileChanged && <div className="new-file-label">NEW</div>}
        <input {...getInputProps()} />
        {(() => {
          if (currentFile || filename) {
            return (
              <div className="accepted-file">
                <span className="icon-common-file-text1 black mr-3" />
                <div className="accepted-file__text">
                  <span className="file-name">{currentFile ? currentFile.name : filename}</span>
                  <span>Replace the document file</span>
                </div>
              </div>
            )
          } if (!isDragActive && !acceptedFiles[0]) {
            return (
              <React.Fragment>
                <p>This is a drag & drop area.</p>
                <p>You can also browse your files manually.</p>
                {isFileRejected ? (
                  <span className="reject">File type not accepted, sorry!</span>
                ) : (
                  !disabled && <span>Click here to browse your files</span>
                ) }
              </React.Fragment>
            )
          } if (isDragActive) {
            return (
              <React.Fragment>
                <p>Drop it here.</p>
              </React.Fragment>
            )
          }
        })()}

      </div>
      {touched && error
      && (
        <div className="input-feedback-text invalid">
          {error}
        </div>
      )}
    </section>
  )
}

export default DropZoneField
