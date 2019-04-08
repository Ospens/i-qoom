import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import FirstCard from './FirstCard'
import WhatIsIQoom from './WhatIsIQoom'
import SamplesContents from './SamplesContents'
import Pricing from './Pricing'
import Reviews from './Reviews'
import GetStarted from './GetStarted'
import Footer from './Footer'

class LandingPage extends Component {

  state = {
    showSignInSlider: false,
    showSignUp: false
  }

  toggleSignInSlider = () => {
    const { showSignInSlider } = this.state
    this.setState({
      showSignInSlider: !showSignInSlider,
      showSignUp: false
    })
  }

  toggleSignUp = () => {
    const { showSignUp } = this.state
    this.setState({
      showSignUp: !showSignUp,
      showSignInSlider: false
    })
  }

  showMainPage = () => {
    this.setState({
      showSignUp: false,
      showSignInSlider: false
    })
  }

  render() {
    const { showSignInSlider, showSignUp } = this.state
    return (
    <div className='landing-page'>
        <LandingPageHeader
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          showMainPage={this.showMainPage}
          toggleSignInForm={this.toggleSignInSlider}
          toggleSignUp={this.toggleSignUp}
        />
        <FirstCard
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          toggleSignInForm={this.toggleSignInSlider}
        />
        <WhatIsIQoom />
        <SamplesContents />
        <Pricing />
        <Reviews />
        <GetStarted />
        <Footer />
    </div>
    )
  }
}

export default LandingPage
