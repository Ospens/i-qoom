import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import plus from '../images/add_1'
import trash from '../images/trash_bucket'

class FileField extends Component {

  state = {
    file: '',
    imagePreviewUrl: ''
  }

  onInputChange = (e, input) => {
    e.preventDefault()

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
    input.onChange(file)
  }

  renderLogo = (imagePreviewUrl) => {
    return (
      <div className='logo-container'>
        <ReactSVG
          svgStyle={{ height: 35 }}
          className='trash-icon'
          src={trash}
          onClick={() => this.setState({ file: '', imagePreviewUrl: ''})}
        />
        <img src={imagePreviewUrl} /> 
      </div>
    )
  }

  render() {
    const { imagePreviewUrl } = this.state
    const { input, dataAllowedFileExtensions } = this.props
    const imagePreview = imagePreviewUrl ? this.renderLogo(imagePreviewUrl) : null
    const mainClass = classnames({'image-preview': imagePreview})

    return (
      <div className={mainClass}>
        {imagePreview}
        {!imagePreview &&
          <div>
          <input
            onChange={(e) => this.onInputChange(e, input)}
            id='file_logo'
            type='file'
            className='inputfile'
            data-allowed-file-extensions={dataAllowedFileExtensions}
          />
            <label htmlFor='file_logo'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20 }}
                className='plus-icon'
                src={plus}
              />
              <strong>Add a logo</strong>
            </label>
          </div>}
      </div>
    )
  }
}

export default FileField
