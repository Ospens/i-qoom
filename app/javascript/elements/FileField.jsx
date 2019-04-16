import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import plus from '../images/add_1'

class FileField extends Component {

  state = {
    file: '',
    imagePreviewUrl: ''
  }

  render() {
    const { imagePreviewUrl } = this.state
    const { input, dataAllowedFileExtensions } = this.props
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    }

    const onInputChange = (e) => {
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
    const mainClass = classnames({'image-preview': imagePreview})

    return (
      <div className={mainClass}>
        {imagePreview}
        {!imagePreview &&
          <div>
          <input
            onChange={onInputChange}
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
          <div>test</div>
      </div>
    )
  }
}

export default FileField
