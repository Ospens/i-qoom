import React, { Component } from 'react'
import classnames from 'classnames'
import SignIn from './SignIn'
import SignUp from './SignUp'
import CKEditor from '@ckeditor/ckeditor5-react'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'

class FirstCard extends Component {


  renderForAdmin = () => (
      <CKEditor
        editor={InlineEditor}
        /*config={{
          toolbar: ['heading', '|', 'bulletedList', 'numberedList', 'alignment', 'undo', 'redo']
        }}*/
        config={{
          plugins: [Alignment, Bold, Italic, Heading],
          toolbar: ['Heading', '|', 'Bold', 'Italic', 'Alignment', 'Link', 'List', 'ListUI', 'BlockQuote', 'Undo', 'Redo'],
          removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
        }}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor.config._config.toolbar);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={editor => {
          console.log('Blur.', editor);
        }}
        onFocus={editor => {
          console.log('Focus.', editor);
        }}
      />
  )

  render() {
    const { showSignInSlider, toggleSignInForm, showSignUp, showMainPage } = this.props
    const welcomeClass = classnames('welocme-text', { 'show-slider': showSignInSlider})
    return (
      <section id='first-card'>
        {showSignUp && <SignUp
          showMainPage={showMainPage}
        />}
        {!showSignUp &&
          <div className='container'>
          <div className='welcome-and-signin justify-content-center'>
            <div className={welcomeClass}>
              <div className='first-line'>We get your project</div>
              <div className='second-line'>Started & Managed</div>
              <a href='#get-started-card' className='btn btn-light contact-us'>Contact us</a>
            </div>
            <SignIn
              showSignInSlider={showSignInSlider}
              toggleSignInForm={toggleSignInForm}
            />
          </div>
        </div>}
      </section>
    )
  }
}

export default FirstCard
