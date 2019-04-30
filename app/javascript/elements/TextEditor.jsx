import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class TextEditor extends Component {

  state = {
    editor: false
  }

  renderEditor = (text) => (
    <CKEditor
      editor={ClassicEditor}
      /*config={{
        plugins: [Alignment, Bold, Italic, Heading],
        toolbar: ['Heading', '|', 'Bold', 'Italic', 'Alignment'],
        removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
      }}*/
      data={text.props.children}
      onInit={editor => {
        // You can store the "editor" and use when it is needed.
        //console.log('Editor is ready to use!', editor.config._config.toolbar)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        //console.log({ event, editor, data })
      }}
      onBlur={editor => {
        this.setState({ editor: false })
        //console.log('Blur.', editor)
      }}
      onFocus={editor => {
        //console.log('Focus.', editor)
      }}
    />
  )

  render() {
    const { editor } = this.state
    const { text } = this.props
    return (
      <React.Fragment>
        {editor ?
        (
          this.renderEditor(text)
        ) : (
          <div onClick={() => this.setState({editor: true})}>
            {text}
          </div>
        )}
      </React.Fragment>
    )
  }
}
 
export default TextEditor