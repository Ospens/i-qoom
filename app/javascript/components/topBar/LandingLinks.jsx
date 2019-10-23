import React from 'react'

function LandingLinks({ navClass }) {
  return (
    <ul className={`nav navbar-nav menu_nav justify-content-center ${navClass}`}>
      <li className='nav-item'><a href='#' className='nav-link'>Start</a></li>
      <li className='nav-item'><a href='#samples-card' className='nav-link'>Examples</a></li>
      <li className='nav-item'><a href='#what-is-card' className='nav-link'>i-Qoom</a></li>
      <li className='nav-item'><a href='#pricing-card' className='nav-link'>Pricing</a></li>
      <li className='nav-item'><a href='#reviews-card' className='nav-link'>Reviews</a></li>
      <li className='nav-item'><a href='#get-started-card' className='nav-link'>Contact</a></li>
    </ul>
  )
}

export default LandingLinks
