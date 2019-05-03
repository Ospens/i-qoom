import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../elements/TextEditor'

class WhatIsIQoom extends Component {

  render() {
    const { authed, editable, title, description } = this.props
    return (
      <section id='what-is-card'>
        <div className='container'>
          {authed && editable ?
            (
              <React.Fragment>
                <TextEditor text={title} className='mb-5' />
                <TextEditor text={description} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='mb-5' dangerouslySetInnerHTML={{ __html: title }}></div>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </React.Fragment>
            )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth, landing }) => ({
  authed: auth.authStatus,
  title: landing.whatISIQoom.title,
  description: landing.whatISIQoom.description
})

export default connect(mapStateToProps)(WhatIsIQoom)