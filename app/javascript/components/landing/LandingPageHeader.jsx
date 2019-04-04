import React, { Component } from 'react'
import logo from '../../images/Logo.png'

class LandingPageHeader extends Component {

  render() {
    const { toggleSignInForm, showSignInSlider } = this.props
    const navClass = `${showSignInSlider ? 'show-slider' : ''}`

    return (
      <header>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <div className='container'>
            <a className='navbar-brand logo_h' href='#'>
              <img className='logo' src={logo} alt='Logo' />
            </a>
            <div className='collapse navbar-collapse offset'>
              <ul className={`nav navbar-nav menu_nav justify-content-center ${navClass}`}>
                <li className='nav-item'><a href='#' className='nav-link'>Start</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>i-Qoom</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Pricing</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Reviews</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Contact</a></li>
              </ul>

              <ul className={`justify-content-center back-button ${navClass}`}>
                <li>
                  <button
                    type='button'
                    className='btn nav-link back-to-start'
                    onClick={toggleSignInForm}>
                      BACK TO START PAGE
                  </button>
                </li>
              </ul>

              <ul className='nav navbar-nav justify-content-end auth-buttons'>
                <li className='nav-item'><button type='button' className='nav-link btn-transparent'>Register</button></li>
                <li className='nav-item'><button type='button' className='btn nav-link btn-transparent' onClick={toggleSignInForm}>Login</button></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default LandingPageHeader