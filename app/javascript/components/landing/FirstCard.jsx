import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import SignIn from './SignIn'
import SignUp from './SignUp'
import TextEditor from '../../elements/TextEditor'

class FirstCard extends Component {

  render() {
    const {
      showSignInSlider,
      toggleSignInForm,
      showSignUp,
      showMainPage,
      authed,
      editable,
      firstLine,
      secondLine
    } = this.props
    const welcomeClass = classnames('welocme-text', { 'show-slider': showSignInSlider})
    return (
      <section id='first-card'>
        {showSignUp && <SignUp
          showMainPage={showMainPage}
        />}
        {!showSignUp &&
          <div className='container'>
          <div className='welcome-and-signin justify-content-center'>
            <div className={welcomeClass}>
              {authed && editable ?
                (
                  <React.Fragment>
                    <TextEditor text={firstLine} />
                    <TextEditor text={secondLine} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div dangerouslySetInnerHTML={{__html: firstLine}} />
                    <div dangerouslySetInnerHTML={{ __html: secondLine}} />
                  </React.Fragment>
                )}
              <a href='#get-started-card' className='btn btn-light contact-us'>Contact us</a>
            </div>
            <SignIn
              showSignInSlider={showSignInSlider}
              toggleSignInForm={toggleSignInForm}
            />
          </div>
        </div>}
      </section>
    )
  }
}

const mapStateToProps = ({ auth, landing }) => ({
  authed: auth.authStatus,
  firstLine: landing.firstCard.firstLine,
  secondLine: landing.firstCard.secondLine
})

export default connect(mapStateToProps)(FirstCard)
