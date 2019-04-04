import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import FirstCard from './FirstCard'

class LandingPage extends Component {

  state = {
    showSignInSlider: false
  }

  toggleSignInSlider = () => {
    const { showSignInSlider } = this.state
    this.setState({ showSignInSlider: !showSignInSlider })
  }

  render() {
    const { showSignInSlider } = this.state
    return (
    <div className='landing-page'>
        <LandingPageHeader
          showSignInSlider={showSignInSlider}
          toggleSignInForm={this.toggleSignInSlider}
        />
        <FirstCard showSignInSlider={showSignInSlider} toggleSignInForm={this.toggleSignInSlider}/>
      <section id='secondCard'></section>
    </div>
    )
  }
}

export default LandingPage
