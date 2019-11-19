import React, { useState, useEffect, useCallback } from 'react'
import classnames from 'classnames'

function Logo({ url, discardLogo }) {
  return (
    <div className='logo-container'>
      <div className='trash-icon-container'>
        <span
          className='icon-bin-1 white'
          onClick={discardLogo}
        />
      </div>
      <img src={url} />
    </div>
  )
}

function FileField({ dataAllowedFileExtensions, input }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  useEffect(() => {
    if (typeof input.value !== 'string') return

    input.onChange(null)
    setImagePreviewUrl(input.value)
  }, [input])
  
  const discardLogo = useCallback(() => {
    setImagePreviewUrl('')
    input.onChange({})
  }, [input])

  const onInputChange = useCallback(e => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
    input.onChange(file)
  }, [input])
  const imagePreview = imagePreviewUrl ? <Logo url={imagePreviewUrl} discardLogo={discardLogo} /> : null
  const mainClass = classnames({ 'image-preview': imagePreview })
  
  return (
    <div className={mainClass}>
      {imagePreview}
      {!imagePreview &&
        <div>
          <input
            onChange={e => onInputChange(e)}
            id='file_logo'
            type='file'
            className='inputfile'
            data-allowed-file-extensions={dataAllowedFileExtensions}
          />
          <label htmlFor='file_logo'>
            <div>
              <span className='icon-add_1' />
            </div>
            <strong>Add a logo</strong>
          </label>
        </div>}
    </div>
  )
}

export default FileField
