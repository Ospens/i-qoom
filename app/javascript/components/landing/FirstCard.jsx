import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextEditor from '../../elements/TextEditor'

class FirstCard extends Component {

  render() {
    const {
      authed,
      editable,
      firstLine,
      secondLine
    } = this.props

    return (
      <section id='first-card'>
        <div className='container'>
          <div className='welcome-and-signin justify-content-center'>
            <div className='welocme-text'>
              {authed && editable ?
                (
                  <React.Fragment>
                    <TextEditor text={firstLine} />
                    <TextEditor text={secondLine} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div dangerouslySetInnerHTML={{__html: firstLine}} />
                    <div dangerouslySetInnerHTML={{ __html: secondLine}} />
                  </React.Fragment>
                )}
              <a href='#get-started-card' className='btn btn-light contact-us'>Contact us</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ user, landing }) => ({
  authed: user.authStatus,
  firstLine: landing.firstCard.firstLine,
  secondLine: landing.firstCard.secondLine
})

export default connect(mapStateToProps)(FirstCard)
