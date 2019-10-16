import React from 'react'
import ReactSVG from 'react-svg'
import lines from '../../images/send-lines'
import plan from '../../images/send-email-big'

function SignedUp() {
  return (
    <section id='first-card'>
      <div className='container'>
        <div className='welcome-and-signin justify-content-center'>
          <div className='signedup-message'>
            <div className='signedup-message_block'>
              <div>
                <h2>Success!</h2>
                <h2>Confirmation link has been sent.</h2>
              </div>
              <div className='text-msg'>
                Thank you for your registration to i-Qoom. An email with a registration link has been sent to you.
                In order to complete the registration process, please confirm your email
                address by clicking on the button in the email.
              </div>
              <div className='pictures-container'>
                <ReactSVG
                  src={plan}
                  svgClassName='svg-plan'
                  className='svg-container'
                />
                <ReactSVG
                  src={lines}
                  svgClassName='svg-line'
                  className='svg-container'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignedUp