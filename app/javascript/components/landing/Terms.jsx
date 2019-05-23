import React, { Component } from 'react'
import TextEditor from '../../elements/TextEditor'
import { connect } from 'react-redux'

class Terms extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { authed, content, editable } = this.props
    return (
      <section className='container info-container'>
        <div className='text-center'>
        {authed && editable ?
          (
            <TextEditor text={content} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ user, landing }) => ({
  authed: user.authStatus,
  content: landing.terms.content
})

export default connect(mapStateToProps)(Terms)
