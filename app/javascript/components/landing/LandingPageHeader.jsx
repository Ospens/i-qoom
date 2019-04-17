import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutUser } from '../../actions/userActions'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import Logo from '../../images/Logo_header'
import Left from '../../images/arrow-button-left'
import bell from '../../images/alarm-bell'
import messages from '../../images/email-action-unread'
import tmpAvatar from '../../images/colors'

class LandingPageHeader extends Component {

  render() {
    const { toggleSignInForm,
      showSignInSlider,
      toggleSignUp,
      showSignUp,
      showMainPage,
      authenticated,
      signOutUser,
      nonMain
    } = this.props
    const navClass = classnames({ 'show-slider': showSignInSlider || showSignUp || nonMain })
    const headerClass = classnames({ 'colorful': nonMain })

    return (
      <header className={headerClass}>
        <nav className='navbar navbar-expand-sm'>
          <div className='container'>
            <Link className='navbar-brand logo_h' to='/'>
              <ReactSVG
                svgStyle={{ height: 40 }}
                src={Logo}
              />
            </Link>
            <div className='collapse navbar-collapse offset'>
              <ul className={`nav navbar-nav menu_nav justify-content-center ${navClass}`}>
                <li className='nav-item'><a href='#' className='nav-link'>Start</a></li>
                <li className='nav-item'><a href='#samples-card' className='nav-link'>Examples</a></li>
                <li className='nav-item'><a href='#what-is-card' className='nav-link'>i-Qoom</a></li>
                <li className='nav-item'><a href='#pricing-card' className='nav-link'>Pricing</a></li>
                <li className='nav-item'><a href='#reviews-card' className='nav-link'>Reviews</a></li>
                <li className='nav-item'><a href='#get-started-card' className='nav-link'>Contact</a></li>
              </ul>

              <div className={`nav justify-content-center back-button ${navClass}`}>
                <Link to='/'
                  className='btn nav-link back-to-start'
                  onClick={showMainPage}>
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                    src={Left}
                  />
                    BACK TO START PAGE
                </Link>
              </div>

              {!authenticated &&
                <ul className='nav navbar-nav justify-content-end auth-buttons'>
                  <li className='nav-item'><Link to='/' className='nav-link btn-transparent' onClick={toggleSignUp}>Register</Link></li>
                  <li className='nav-item'><Link to='/' className='nav-link btn-transparent' onClick={toggleSignInForm}>Login</Link></li>
                </ul>
              }
              {authenticated &&
                <ul className='nav navbar-nav justify-content-end auth-buttons'>
                <li className='nav-item'><button type='button' className='nav-link btn-transparent' onClick={signOutUser}>Logout</button></li>
                  <li className='nav-item'>
                    <button type='button' className='nav-link btn-transparent'>
                      <ReactSVG
                        svgStyle={{ height: 15, marginRight: 10 }}
                        src={bell}
                      />
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button type='button' className='nav-link btn-transparent'>
                      <ReactSVG
                        svgStyle={{ height: 15, marginRight: 10 }}
                        src={messages}
                      />
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button type='button' className='nav-link btn-transparent'>
                      <ReactSVG
                        svgStyle={{ height: 30, width: 30 }}
                        src={tmpAvatar}
                      />
                    </button>
                  </li>
                </ul>
              }
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authStatus
})

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageHeader)
