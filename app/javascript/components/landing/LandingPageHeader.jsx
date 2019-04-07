import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import Logo from '../../images/Logo_header'
import Left from '../../images/arrow-button-left'

class LandingPageHeader extends Component {

  render() {
    const { toggleSignInForm, showSignInSlider, toggleSignUp, showSignUp, showMainPage } = this.props
    const navClass = classnames({ 'show-slider': showSignInSlider || showSignUp })

    return (
      <header>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <div className='container'>
            <a className='navbar-brand logo_h' href='#'>
              <ReactSVG
                svgStyle={{ height: 40 }}
                src={Logo}
              />
            </a>
            <div className='collapse navbar-collapse offset'>
              <ul className={`nav navbar-nav menu_nav justify-content-center ${navClass}`}>
                <li className='nav-item'><a href='#' className='nav-link'>Start</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>i-Qoom</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Pricing</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Reviews</a></li>
                <li className='nav-item'><a href='#' className='nav-link'>Contact</a></li>
              </ul>

              <div className={`nav justify-content-center back-button ${navClass}`}>
                <button
                  type='button'
                  className='btn nav-link back-to-start'
                  onClick={showMainPage}>
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                    src={Left}
                  />
                    BACK TO START PAGE
                </button>
              </div>

              <ul className='nav navbar-nav justify-content-end auth-buttons'>
                <li className='nav-item'><button type='button' className='nav-link btn-transparent' onClick={toggleSignUp}>Register</button></li>
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