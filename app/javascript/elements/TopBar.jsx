import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import UserAvatar from 'react-user-avatar'
import { signOutUser } from '../actions/userActions'

const landingBarPath = ['/', '/terms', '/imprint', '/signin', '/signup', '/signedup', '/menu']
const backPaths = ['signin', '/signup', '/signedup', '/terms', '/imprint', '/menu']

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

  renderUserOptions = (isLanding = false) => {
    const { signOutUser, firstName, lastName } = this.props
    const ulClass = classnames('header-options', { 'white': isLanding })

    return (
      <ul className={ulClass}>
        <li className='nav-item'>
          <button type='button' className='logout' onClick={signOutUser}>
            Logout
          </button>
        </li>
        <li className='nav-item nav-item-icon'>
          <button type='button'>
            <span className='icon-email-action-unread gray' />
          </button>
        </li>
        <li className='nav-item nav-item-icon'>
          <button type='button'>
            <span className='icon-alarm-bell gray' />
          </button>
        </li>
        <li className='nav-item user-info-avatar'>
          <Link className='nav-link btn-transparent' to='/dashboard'>
            <button type='button' className='nav-link btn-transparent'>
              <UserAvatar size='42' name={`${firstName} ${lastName}`} />
            </button>
          </Link>
        </li>
      </ul>
    )
  }

  renderLandingBar = (isOpen, toggle) => {
    const {
      authed,
      isAdmin,
      location: { pathname }
    } = this.props

    const nonMain = location.pathname !== '/'
      && location.pathname !== '/admin_panel' 
      && location.pathname !== '/signedup'
      && !location.pathname.includes('signin')
    const navClass = classnames({ 'show-slider': backPaths.includes(pathname) || pathname.includes('signin') })
    const headerClass = classnames({ 'colorful': nonMain })

    return (
      <header className={headerClass}>
        <nav className='navbar navbar-expand-sm'>
          {!isOpen &&
          <div className='navbar-burger-block'  onClick={toggle}>
            <span className='icon-Burgermenu_2' />
            {isAdmin && <span className='text-white'>Admin access</span>}
          </div>}
          <div className='container'>
            <Link className='navbar-brand logo_h' to='/'>
              <i className='svg-icon logo-header' />
            </Link>
            <div className='navbar-collapse offset'>
              {this.renderLandingLinks(navClass)}
              <div className={`nav justify-content-center back-button ${navClass}`}>
                <Link to='/' className='btn nav-link btn-back' >
                  <span className='icon-arrow-button-left' />
                  BACK TO START PAGE
                </Link>
              </div>
              {authed 
                ? this.renderUserOptions(true)
                : <ul className='nav navbar-nav justify-content-end auth-buttons'>
                  <li className='nav-item'>
                    <Link to='/signup' className='nav-link btn-transparent'>
                      Register
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/signin' className='nav-link btn-transparent'>
                      Login
                    </Link>
                  </li>
                </ul>}
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
        <h2>
          <i className='icon-Burgermenu_2 mr-5' onClick={toggle} />
        </h2>
      </div>}
      {this.props.header}
      {this.renderUserOptions()}
    </div>
  )

  render() {
    const { location: { pathname }, isOpen, toggle } = this.props

    if (landingBarPath.includes(pathname) || pathname === '/admin_panel' || pathname.includes('signin')) {
      return (this.renderLandingBar(isOpen, toggle))
    } else {
      return (this.renderDashboardBar(isOpen, toggle))
    }
  }
}

const mapStateToProps = ({ user, projects }) => ({
  authed: user.authStatus,
  header: projects.title,
  firstName: user.first_name,
  lastName: user.last_name,
  isAdmin: user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopBar))
