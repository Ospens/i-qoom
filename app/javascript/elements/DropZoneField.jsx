import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import fileIcon from '../images/common-file-text_active'

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

function DropZoneField({ input, label, isDisabled = false }) {

  const onDrop = useCallback(acceptedFiles => {
    const fileBlob = acceptedFiles[0]
    const newFile = {}
    fileProperties.forEach(key => {
      newFile[key] = fileBlob[key]
    })
    input.onChange(acceptedFiles)

  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    rejectedFiles,
    acceptedFiles
  } = useDropzone({
    disabled: isDisabled,
    onDrop,
    accept: 'application/pdf',
    minSize: 0
  })

  const isFileRejected = rejectedFiles.length !== 0
  const mainClass = classnames(
    'drop-zone-area',
    {
      'with-file': acceptedFiles[0],
      'disabled': isDisabled
    }
  )
  
  const currentFile = input.value ? input.value[0] : acceptedFiles[0]
  return (
    <section>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div {...getRootProps()} {...input} className={mainClass}>
        <input {...getInputProps()} />
        {(() => {
          if (currentFile) {
            return (
              <div className='accepted-file'>
                <ReactSVG
                  svgStyle={{ height: 40, width: 40, marginRight: 15 }}
                  src={fileIcon}
                />
                <div className='accepted-file__text'>
                  <p>Old file</p>
                  <span className='file-name'>{currentFile.name}</span>
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
                  !isDisabled && <span>Click here to browse your files</span>
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
    </section>
  )
}

export default DropZoneField