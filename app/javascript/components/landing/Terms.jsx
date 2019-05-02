import React, { Component } from 'react'
import TextEditor from '../../elements/TextEditor'
import { connect } from 'react-redux'

class Terms extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { authed, isAdmin, content } = this.props
    return (
      <section className='container info-container'>
        <div className='text-center'>
        {authed && isAdmin ?
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

const mapStateToProps = ({ auth, landing }) => ({
  authed: auth.authStatus,
  isAdmin: true,
  content: landing.terms.content
})

export default connect(mapStateToProps)(Terms)
