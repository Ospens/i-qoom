import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import fileIcon from '../images/common-file-text_active'

function DragAndDropField(props) {
  const { input, label } = props

  const onDrop = useCallback(acceptedFiles => {
    input.onChange(acceptedFiles[0])
    // console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive, rejectedFiles, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'image/png',
    minSize: 0
  })

  const isFileRejected = rejectedFiles.length !== 0
  const mainClass = classnames('drag-and-drop-area', { 'with-file': acceptedFiles[0] })

  return (
    <section>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div {...getRootProps()} className={mainClass}>
        <input {...getInputProps()} />
        {(() => {
          if (acceptedFiles[0]) {
            return (
              <div className='accepted-file'>
                <ReactSVG
                  svgStyle={{ height: 40, width: 40, marginRight: 15 }}
                  src={fileIcon}
                />
                <div className='accepted-file__text'>
                  <p>Old file</p>
                  <span className='file-name'>{acceptedFiles[0].name}</span>
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
                  <span>Click here to browse your files</span>
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

export default DragAndDropField