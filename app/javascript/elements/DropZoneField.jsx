import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'

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

function DropZoneField({ input, filename, label, disabled = false, meta: { touched, error } }) {

  const onDrop = useCallback(acceptedFiles => {
    input.onChange(acceptedFiles)
  }, [])

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

  const mainClass = classnames(
    'drop-zone-area',
    {
      'with-file': acceptedFiles[0],
      disabled
    }
  )

  const sectionClass = classnames({ 'is-invalid': touched && error })
  const currentFile = input.value ? input.value[0] : acceptedFiles[0]

  return (
    <section className={sectionClass}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div {...getRootProps()} className={mainClass}>
        <input {...getInputProps()}/>
        {(() => {
          if (currentFile || filename) {
            return (
              <div className='accepted-file'>
                <span className='icon-common-file-text1 black mr-3' />
                <div className='accepted-file__text'>
                  <span className='file-name'>{currentFile ? currentFile.name : filename}</span>
                  <span>Replace the document file</span>
                </div>
              </div>
            )
          } else if (!isDragActive && !acceptedFiles[0]) {
            return (
              <React.Fragment>
                <p>This is a drag & drop area.</p>
                <p>You can also browse your files manually.</p>
                {isFileRejected ? (
                  <span className='reject'>File type not accepted, sorry!</span>
                ) : (
                  !disabled && <span>Click here to browse your files</span>
                ) }
              </React.Fragment>
            )
          } else if (isDragActive) {
            return (
              <React.Fragment>
                <p>Drop it here.</p>
              </React.Fragment>
            )
          }
        })()}

      </div>
      {touched && error &&
      <div className='invalid-feedback'>
        {error}
      </div>}
    </section>
  )
}

export default DropZoneField
