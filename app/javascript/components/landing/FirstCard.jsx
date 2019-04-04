import React, { Component } from 'react'
import SignIn from './SignIn'

class FirstCard extends Component {

  render() {
    const { showSignInSlider, toggleSignInForm } = this.props
    const welcomeClass = `${showSignInSlider ? 'show-slider' : ''}`
    return (
      <section id='first-card'>
        <div className='container'>
          <div className='welcome-and-signin'>
            <div className={`welocme-text ${welcomeClass}`}>
              <div className='first-line'>We get your project</div>
              <div className='second-line'>Started & Managed</div>
              <button type='button' className='btn btn-light contact-us'>Contact Us</button>
            </div>
            <SignIn
              showSignInSlider={showSignInSlider}
              toggleSignInForm={toggleSignInForm}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default FirstCard
