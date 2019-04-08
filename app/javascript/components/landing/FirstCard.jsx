import React, { Component } from 'react'
import classnames from 'classnames'
import SignIn from './SignIn'
import SignUp from './SignUp'

class FirstCard extends Component {

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
              <button type='button' className='btn btn-light contact-us'>Contact Us</button>
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
