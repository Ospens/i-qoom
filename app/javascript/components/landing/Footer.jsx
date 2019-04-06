import React, { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <section id='footer-card'>
        <div className='container text-center'>
          <h3>i-Qoom</h3>
          <div className='row justify-content-center info-row'>
            <div className='col-md-auto'>
              IMPRINT
            </div>
            <div className='col-md-auto'>
              TERMS AND CONDITIONS
            </div>
          </div>
          <div className='rights-reserved'>
            @ 2018 Shamin yassar. All rights reserved.
          </div>
        </div>
      </section>
    )
  }
}

export default Footer
