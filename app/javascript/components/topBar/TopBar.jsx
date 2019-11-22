import React from 'react'
import { useLocation } from 'react-router-dom'
import DashboardBar from './DashboardBar'
import LandingBar from './LandingBar'

function TopBar({ isOpen, toggle }) {
  const { pathname } = useLocation()

  if (pathname.includes('dashboard')) {
    return <DashboardBar isOpen={isOpen} toggle={toggle} />
  } else {
    return <LandingBar isOpen={isOpen} toggle={toggle} />
  }
}

export default TopBar
