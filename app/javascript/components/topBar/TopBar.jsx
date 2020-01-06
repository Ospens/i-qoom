import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DashboardBar from './DashboardBar'
import LandingBar from './LandingBar'
import { toggleSidebar } from '../../actions/projectActions'

function TopBar() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isOpen = useSelector(({ projects }) => projects.sidebar)
  const toggleOn = useCallback(() => dispatch(toggleSidebar(false)), [dispatch])

  if (pathname.includes('dashboard')) {
    return <DashboardBar isOpen={isOpen} toggle={toggleOn} />
  }
  return <LandingBar isOpen={isOpen} toggle={toggleOn} />
}

export default TopBar
