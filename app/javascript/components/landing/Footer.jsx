import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id='footer-card'>
      <div className='container text-center'>
        <h3>i-Qoom</h3>
        <div className='row justify-content-center info-row mt-3'>
          <div className='col-md-auto imptint'>
            <Link to='/imprint'>IMPRINT</Link>
          </div>
          <div className='col-md-auto terms'>
            <Link to='/terms'>TERMS AND CONDITIONS</Link>
          </div>
        </div>
        <div className='rights-reserved'>
          @ 2018 Shamin yassar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
