import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import SignIn from './SignIn'
import SignUp from './SignUp'
import TextEditor from '../../elements/TextEditor'

class FirstCard extends Component {

  render() {
    const { showSignInSlider, toggleSignInForm, showSignUp, showMainPage, authed, isAdmin } = this.props
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
              {authed && isAdmin ?
                (
                  <React.Fragment>
                    <TextEditor text={<div className='first-line'>We get your project</div>} />
                    <TextEditor text={<div className='second-line'>Started & Managed</div>} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className='first-line'>We get your project</div>
                    <div className='second-line'>Started & Managed</div>
                  </React.Fragment>
                )}
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

const mapStateToProps = ({ auth }) => ({
  authed: auth.authStatus,
  isAdmin: true
})

export default connect(mapStateToProps)(FirstCard)
