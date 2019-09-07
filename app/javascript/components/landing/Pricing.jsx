import React from 'react'
import { Link } from 'react-router-dom'

function Pricing() {
  return (
    <section id='pricing-card'>
      <div className='text-center container'>
        <h2 className='pricing-card__title' style={{ fontSize: '65px', color: '#221F6D' }}>Pricing</h2>
        <h3 className='text-center'>Become an i-Qoom member and register for free</h3>
        <div className='this-is-pricing'>
          <span>This is the pricing, yes, it’s that easy.</span>
        </div>
        <div className='pricing-project'>
          <div className='row first-row'>
            <div className='col-6'>First 2 users</div>
            <div className='col-6'>for free</div>
          </div>
          <div className='row second-row'>
            <div className='col-6'>All additional users each</div>
            <div className='col-6'>89€</div>
          </div>
          <Link to='/signup' className='btn btn-primary'>Register</Link>
        </div>
      </div>
    </section>
  )
}

export default Pricing
