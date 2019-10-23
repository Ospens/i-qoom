import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import LandingLinks from './LandingLinks'
import UserOptions from './UserOptions'
import Bell from './Bell'

const backPaths = ['signin', '/signup', '/signedup', '/terms', '/imprint', '/menu', '/restore-password', '/new-password']

function LandingBar({ isOpen, toggle }) {
  const authed = useSelector(state => state.user.authStatus)
  const isAdmin = false
  const { pathname } = useLocation()

  const nonMain = location.pathname !== '/'
    && location.pathname !== '/admin_panel'
    && location.pathname !== '/restore-password'
    && location.pathname !== '/signedup'
    && !location.pathname.includes('signin')
  const navClass = classnames({ 'show-slider': backPaths.includes(pathname) || pathname.includes('signin') || pathname.includes('new-password') })
  const headerClass = classnames({ 'colorful': nonMain })

  return (
    <header className={headerClass}>
      <nav className='navbar navbar-expand-sm'>
        {!isOpen &&
          <div className='navbar-burger-block' onClick={toggle}>
            <span className='icon-Burgermenu_2' />
            {isAdmin && <span className='text-white'>Admin access</span>}
          </div>}
        <div className='container'>
          <Link className='navbar-brand logo_h' to='/'>
            <i className='svg-icon logo-header' />
          </Link>
          <div className='navbar-collapse offset'>
            <LandingLinks navClass={navClass} />
            <div className={`nav justify-content-center back-button ${navClass}`}>
              <Link to='/' className='btn nav-link btn-back' >
                <span className='icon-arrow-button-left' />
                BACK TO START PAGE
              </Link>
            </div>
            {authed
              ? <UserOptions isLanding={true} />
              : <ul className='nav navbar-nav auth-buttons'>
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
                <Bell activeColor='white' />
              </ul>}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default LandingBar
