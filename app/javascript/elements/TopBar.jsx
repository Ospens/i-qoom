import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import { signOutUser } from '../actions/userActions'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import bell from '../images/alarm-bell'
import messages from '../images/email-action-unread'
import UserAvatar from 'react-user-avatar'
import logo from '../images/Logo_header'
import logoPurple from '../images/i-Qoom_Brand_Logo_Gradient'
import Left from '../images/arrow-button-left'
import burgerIcon from '../images/Burgermenu_2'

class TopBar extends Component {

  renderLandingLinks = navClass => (
    <ul className={`nav navbar-nav menu_nav justify-content-center ${navClass}`}>
      <li className='nav-item'><a href='#' className='nav-link'>Start</a></li>
      <li className='nav-item'><a href='#samples-card' className='nav-link'>Examples</a></li>
      <li className='nav-item'><a href='#what-is-card' className='nav-link'>i-Qoom</a></li>
      <li className='nav-item'><a href='#pricing-card' className='nav-link'>Pricing</a></li>
      <li className='nav-item'><a href='#reviews-card' className='nav-link'>Reviews</a></li>
      <li className='nav-item'><a href='#get-started-card' className='nav-link'>Contact</a></li>
    </ul>
  )

  renderLandingBar = (isOpen, toggle) => {
    const {
      authed,
      signOutUser,
      isAdmin,
      location: { pathname }
    } = this.props

    const backPaths = ['/signin', '/signup', '/terms', '/imprint', '/menu']
    const nonMain = location.pathname !== '/' && location.pathname !== '/admin_panel' && location.pathname !== '/signin'
    const navClass = classnames({ 'show-slider': backPaths.includes(pathname) })
    const headerClass = classnames({ 'colorful': nonMain })

    return (
      <header className={headerClass}>
        <nav className='navbar navbar-expand-sm'>
          {!isOpen &&
            <div className='navbar-burger-block'>
              <ReactSVG
                svgStyle={{ height: 40 }}
                src={burgerIcon}
                onClick={toggle}
              />
            {isAdmin && <span className='text-white'>Admin access</span>}
            </div>}
          <div className='container'>
            <Link className='navbar-brand logo_h' to='/'>
              <ReactSVG
                svgStyle={{ height: 40 }}
                src={logo}
              />
            </Link>
            <div className='collapse navbar-collapse offset'>
              {this.renderLandingLinks(navClass)}
              <div className={`nav justify-content-center back-button ${navClass}`}>
                <Link to='/' className='btn nav-link back-to-start' >
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                    src={Left}
                  />
                  BACK TO START PAGE
                </Link>
              </div>

              {!authed &&
                <ul className='nav navbar-nav justify-content-end auth-buttons'>
                  <li className='nav-item'>
                    <Link to='/signup' className='nav-link btn-transparent' >
                      Register
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/signin' className='nav-link btn-transparent' >
                      Login
                    </Link>
                  </li>
                </ul>
              }
              {authed &&
                <ul className='nav navbar-nav justify-content-end auth-buttons'>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='nav-link btn-transparent'
                      onClick={signOutUser}
                    >
                      Logout
                    </button>
                  </li>
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
                  <li className='nav-item user-info-avatar'>
                    <Link className='nav-link btn-transparent' to='/dashboard'>
                      <button type='button' className='nav-link btn-transparent'>
                        <UserAvatar size='42' name='Anna Danielsson' />
                      </button>
                    </Link>
                  </li>
                </ul>
              }
            </div>
          </div>
        </nav>
      </header>
    )
  }

  renderDashboardBar = (isOpen, toggle) => (
    <div className='top-bar-user-info'>
      {!isOpen &&
        <div className='navbar-burger-block'>
          <ReactSVG
            svgStyle={{ height: 40 }}
            src={burgerIcon}
            onClick={toggle}
          />
        </div>
      }
      <div className='navbar-burger-block'>
        <h2 className='logo-png' >
          <img src={logoPurple} onClick={toggle}/>
        </h2>
      </div>
      <ul>
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
              svgStyle={{ height: 20, marginRight: 10 }}
              src={bell}
            />
          </button>
        </li>
        <li className='nav-item'>
          <button type='button' className='nav-link btn-transparent user-info-avatar'>
            <UserAvatar size='42' name='Anna Danielsson' />
          </button>
        </li>
      </ul>
    </div>
  )

  render() {
    const landingBarPath = ['/', '/terms', '/imprint', '/signin', '/signup', '/menu']
    const { location: { pathname }, isOpen, toggle } = this.props

    if (landingBarPath.includes(pathname) || pathname === '/admin_panel') {
      return (this.renderLandingBar(isOpen, toggle))
    } else {
      return (this.renderDashboardBar(isOpen, toggle))
    }
  }
}

const mapStateToProps = ({ user }) => ({
  authed: user.authStatus,
  isAdmin: user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopBar))
