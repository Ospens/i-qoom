import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {

  render() {
    return (
      <footer id='footer-card'>
        <div className='container text-center'>
          <h3>i-Qoom</h3>
          <div className='row justify-content-center info-row'>
            <div className='col-md-auto'>
              <Link to='/imprint'>IMPRINT</Link>
            </div>
            <div className='col-md-auto'>
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
}

export default Footer
