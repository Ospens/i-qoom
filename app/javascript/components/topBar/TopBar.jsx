import React from 'react'
import { useLocation } from 'react-router-dom'
import DashboardBar from './DashboardBar'
import LandingBar from './LandingBar'

const landingBarPath = [
  '/', 
  '/terms', 
  '/imprint', 
  '/signin', 
  '/signup', 
  '/signedup', 
  '/menu', 
  '/restore-password', 
  '/new-password'
]

function TopBar({ isOpen, toggle }) {
  const { pathname } = useLocation()

  if (
    landingBarPath.includes(pathname)
    || pathname === '/admin_panel'
    || pathname.includes('signin')
    || pathname.includes('new-password'
  )) {
    return <LandingBar isOpen={isOpen} toggle={toggle} />
  } else {
    return <DashboardBar isOpen={isOpen} toggle={toggle} />
  }
}

export default TopBar
